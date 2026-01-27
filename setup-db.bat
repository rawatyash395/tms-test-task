@echo off
echo ====================================
echo TMS Database Setup
echo ====================================
echo.
echo This script will set up the database for TMS.
echo Please make sure PostgreSQL is running.
echo.

set /p DB_PASSWORD="Enter PostgreSQL password for user 'postgres': "

echo.
echo Creating database...
psql -U postgres -c "CREATE DATABASE tms_db;" -W

echo.
echo Setting up tables and data...
cd backend
npm run db:setup

echo.
echo ====================================
echo Database setup complete!
echo ====================================
pause
