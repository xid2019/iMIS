@echo off

:: Start PostgreSQL (assuming Postgres is installed as a Windows service)
echo Starting PostgreSQL...
net start postgresql-x64-13

:: Save the current directory
set SCRIPT_DIR=%~dp0

:: Navigate to the Django backend directory
cd %SCRIPT_DIR%\backend

:: Kill any existing Django runserver processes (if any)
echo Killing any existing Django runserver processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000') do (
    taskkill /PID %%a /F
)

:: Start the Django backend (runs in the background)
echo Starting Django backend...
start python manage.py runserver

:: Navigate to the React frontend directory
cd %SCRIPT_DIR%\frontend

:: Start the React frontend (runs in the background)
echo Starting React frontend...
start npm run dev

:: Wait for the React app to start (optional, but can be useful)
timeout /t 3 > nul

:: Open the browser to the React frontend URL
echo Opening browser...
start http://localhost:5173

echo Both servers are up and running.

:: Monitor the port to check if the browser is connected
set PORT=5173
timeout /t 10 > nul

:check_connection
for /f "tokens=3" %%a in ('netstat -ano ^| findstr :%PORT% ^| findstr ESTABLISHED') do (
    echo Connection found on port %PORT%.
    timeout /t 2 > nul
    goto check_connection
)

echo No established connections found on port %PORT%.
echo Stopping frontend and backend servers.

:: Stop the frontend and backend servers
taskkill /PID %%a /F

:: Assuming you started Django and React with the default commands, 
:: you would need to track their PIDs more precisely if you used `start`
:: In practice, tracking and killing these processes may require more 
:: nuanced handling, particularly if multiple similar processes are running.

exit