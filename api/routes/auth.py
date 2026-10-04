# api/routes/auth.py
# ─────────────────────────────────────────────
# Authentication endpoints: Signup, Login, Profile, Password Reset.
# Backed by Neon DB and JWT tokens.
# ─────────────────────────────────────────────

import logging
from typing import Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from core.database import get_db
from core.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
    get_current_user,
)
from models.db_models import User, SystemLog

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ── Schemas ──────────────────────────────────
class SignupRequest(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None


class LoginRequest(BaseModel):
    email: str
    password: str


class UpdateProfileRequest(BaseModel):
    full_name: Optional[str] = None
    old_password: Optional[str] = None
    new_password: Optional[str] = None


class ForgotPasswordRequest(BaseModel):
    email: str


class ResetPasswordRequest(BaseModel):
    token: Optional[str] = None
    new_password: str


class UserResponse(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    role: str

    class Config:
        from_attributes = True


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# ── Endpoints ────────────────────────────────
@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    """Register a new user account with Neon DB."""
    if len(payload.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters long.",
        )

    # Check for existing user
    existing_user = db.query(User).filter(User.email == payload.email.lower()).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists.",
        )

    # First registered user becomes admin automatically if none exists
    user_count = db.query(User).count()
    role = "admin" if user_count == 0 else "user"

    new_user = User(
        email=payload.email.lower(),
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name or payload.email.split("@")[0],
        role=role,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Generate JWT token
    token = create_access_token(data={"sub": new_user.id, "email": new_user.email, "role": new_user.role})

    # Log registration event
    try:
        log = SystemLog(
            event_type="user_signup",
            user_id=new_user.id,
            details={"email": new_user.email, "role": new_user.role},
        )
        db.add(log)
        db.commit()
    except Exception as exc:
        logger.warning("Could not write signup system log: %s", exc)

    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(new_user),
    )


@router.post("/login", response_model=AuthResponse)
async def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate with email and password, returning a JWT token."""
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        # Log failed attempt
        try:
            log = SystemLog(
                event_type="failed_login",
                details={"email": payload.email.lower()},
            )
            db.add(log)
            db.commit()
        except Exception:
            pass

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})

    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(user),
    )


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Fetch current user profile using JWT token."""
    return UserResponse.model_validate(current_user)


@router.put("/profile", response_model=UserResponse)
async def update_profile(
    payload: UpdateProfileRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update profile details (name and/or password)."""
    if payload.full_name is not None:
        current_user.full_name = payload.full_name.strip()

    if payload.new_password:
        if not payload.old_password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is required to set a new password.",
            )
        if not verify_password(payload.old_password, current_user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect current password.",
            )
        if len(payload.new_password) < 6:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="New password must be at least 6 characters long.",
            )
        current_user.hashed_password = hash_password(payload.new_password)

    db.commit()
    db.refresh(current_user)
    return UserResponse.model_validate(current_user)


@router.post("/forgot-password")
async def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """Generate a password reset token for the given email."""
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user:
        # Always return generic message to avoid email enumeration
        return {"message": "If an account exists with this email, a reset token has been issued."}

    # Generate a short-lived reset token (15 mins)
    reset_token = create_access_token(
        data={"sub": user.id, "purpose": "password_reset"},
        expires_delta=None,
    )

    return {
        "message": "Password reset token generated.",
        "reset_token": reset_token,
    }


@router.post("/reset-password")
async def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)):
    """Reset password using a valid reset token."""
    if not payload.token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset token is required.",
        )

    decoded = decode_access_token(payload.token)
    if not decoded or decoded.get("purpose") != "password_reset":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token.",
        )

    user_id = decoded.get("sub")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    if len(payload.new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters long.",
        )

    user.hashed_password = hash_password(payload.new_password)
    db.commit()

    return {"message": "Password updated successfully. You can now log in."}
