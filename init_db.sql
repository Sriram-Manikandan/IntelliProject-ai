-- ==============================================================================
-- IntelliProject – Neon Database Initialization Script (PostgreSQL)
-- ==============================================================================
-- You can run this directly in the Neon Console SQL Editor if you wish,
-- though the FastAPI application will also automatically create these tables
-- on startup via SQLAlchemy.
-- ==============================================================================

-- Enable UUID extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 2. Saved Projects Table
CREATE TABLE IF NOT EXISTS saved_projects (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_saved_projects_user_id ON saved_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_projects_created_at ON saved_projects(created_at DESC);

-- 3. System Logs Table (Audit / Security / Stats)
CREATE TABLE IF NOT EXISTS system_logs (
    id VARCHAR(36) PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    user_id VARCHAR(255),
    ip_address VARCHAR(100),
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_logs_event_type ON system_logs(event_type);

-- ==============================================================================
-- Demo initial logs
-- ==============================================================================
INSERT INTO system_logs (id, event_type, user_id, ip_address, details)
VALUES (
    uuid_generate_v4()::text,
    'system_init',
    'system',
    '127.0.0.1',
    '{"message": "Database initialized with Neon PostgreSQL"}'::jsonb
) ON CONFLICT DO NOTHING;
