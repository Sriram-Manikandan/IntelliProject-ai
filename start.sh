#!/bin/bash

# IntelliProject - Unified Startup Script
# Starts both FastAPI backend and React frontend simultaneously

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}IntelliProject Startup Script${NC}"
echo -e "${BLUE}================================${NC}\n"

# Cleanup function to kill both processes on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    echo -e "${YELLOW}Servers stopped.${NC}"
}

# Trap SIGINT (Ctrl+C) to cleanup
trap cleanup EXIT INT TERM

# Check if venv exists
if [ ! -d "$PROJECT_ROOT/venv" ]; then
    echo -e "${YELLOW}Virtual environment not found. Creating venv...${NC}"
    python3 -m venv "$PROJECT_ROOT/venv"
fi

# Activate virtual environment
echo -e "${GREEN}Activating Python virtual environment...${NC}"
source "$PROJECT_ROOT/venv/bin/activate"

# Install/update requirements if needed
if [ -f "$PROJECT_ROOT/requirements.txt" ]; then
    echo -e "${GREEN}Checking Python dependencies...${NC}"
    pip install -q -r "$PROJECT_ROOT/requirements.txt"
fi

# Start FastAPI backend
echo -e "${GREEN}Starting backend...${NC}"
cd "$PROJECT_ROOT"
python run.py &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}\n"

# Wait a moment for backend to initialize
sleep 2

# Start React frontend
echo -e "${GREEN}Starting frontend...${NC}"
cd "$PROJECT_ROOT/frontend"

# Check if node_modules exists, if not install dependencies
if [ ! -d "$PROJECT_ROOT/frontend/node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi

npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}\n"

echo -e "${BLUE}================================${NC}"
echo -e "${GREEN}Both servers are running!${NC}"
echo -e "${BLUE}================================${NC}"
echo -e "Backend:  http://localhost:8000"
echo -e "Frontend: http://localhost:5173"
echo -e "\nPress ${YELLOW}Ctrl+C${NC} to stop both servers\n"

# Keep script running
wait
