# IntelliProject - Unified Startup Script (PowerShell)
# Starts both FastAPI backend and React frontend simultaneously

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectRoot

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "IntelliProject Startup Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if venv exists
if (-not (Test-Path "$ProjectRoot\venv")) {
    Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
Write-Host "Activating Python virtual environment..." -ForegroundColor Green
& "$ProjectRoot\venv\Scripts\Activate.ps1"

# Install/update requirements if needed
if (Test-Path "$ProjectRoot\requirements.txt") {
    Write-Host "Checking Python dependencies..." -ForegroundColor Green
    pip install -q -r "$ProjectRoot\requirements.txt"
}

# Start FastAPI backend
Write-Host "Starting backend..." -ForegroundColor Green
Set-Location $ProjectRoot
Start-Process python -ArgumentList "run.py" -WindowStyle Normal
Write-Host "✓ Backend started" -ForegroundColor Green
Write-Host ""

# Wait a moment for backend to initialize
Start-Sleep -Seconds 2

# Check if node_modules exists
if (-not (Test-Path "$ProjectRoot\frontend\frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location "$ProjectRoot\frontend\frontend"
    npm install
}

# Start React frontend
Write-Host "Starting frontend..." -ForegroundColor Green
Set-Location "$ProjectRoot\frontend\frontend"
Start-Process npm -ArgumentList "run", "dev" -WindowStyle Normal

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Both servers are running!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:8000"
Write-Host "Frontend: http://localhost:5173"
Write-Host ""
Write-Host "Close the terminal windows to stop the servers" -ForegroundColor Yellow
Write-Host ""
