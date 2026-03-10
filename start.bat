@echo off
REM IntelliProject - Unified Startup Script (Windows Batch)
REM Starts both FastAPI backend and React frontend simultaneously

setlocal enabledelayedexpansion

set PROJECT_ROOT=%~dp0
cd /d "%PROJECT_ROOT%"

echo.
echo ================================
echo IntelliProject Startup Script
echo ================================
echo.

REM Check if venv exists
if not exist "%PROJECT_ROOT%venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating Python virtual environment...
call "%PROJECT_ROOT%venv\Scripts\activate.bat"

REM Install/update requirements if needed
if exist "%PROJECT_ROOT%requirements.txt" (
    echo Checking Python dependencies...
    pip install -q -r "%PROJECT_ROOT%requirements.txt"
)

REM Start FastAPI backend
echo Starting backend...
cd /d "%PROJECT_ROOT%"
start "IntelliProject Backend" python run.py
echo ✓ Backend started
echo.

REM Wait a moment for backend to initialize
timeout /t 2 /nobreak

REM Check if node_modules exists
if not exist "%PROJECT_ROOT%frontend\node_modules" (
    echo Installing frontend dependencies...
    cd /d "%PROJECT_ROOT%frontend"
    call npm install
)

REM Start React frontend
echo Starting frontend...
cd /d "%PROJECT_ROOT%frontend"
start "IntelliProject Frontend" npm run dev

echo.
echo ================================
echo Both servers are running!
echo ================================
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Close the terminal windows to stop the servers
echo.
pause
