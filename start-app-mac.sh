#!/bin/bash

# Start Postgres.app
echo "Starting PostgreSQL via Postgres.app..."
open --background -a Postgres

# Save the current directory
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Navigate to the Django backend directory
cd "$SCRIPT_DIR/backend"

# Kill any existing Django runserver processes (if any)
pkill -f 'manage.py runserver'


# Start the Django backend (runs in the background)
echo "Starting Django backend..."
python manage.py runserver &

# Get the backend process ID
BACKEND_PID=$!

# Navigate to the React frontend directory
cd "$SCRIPT_DIR/frontend"

# Start the React frontend (runs in the background)
echo "Starting React frontend..."
npm run dev &

# Get the frontend process ID
FRONTEND_PID=$!

# Wait for the React app to start (optional, but can be useful)
sleep 3

# Open the browser to the React frontend URL
echo "Opening browser..."
open http://localhost:5173

echo "Both servers are up and running."

# Monitor the port to check if the browser is connected
# Port to check
PORT=5173
sleep 10
while true; do
    # Check for established TCP connections on the specified port
    CONNECTIONS=$(lsof -i TCP:$PORT -s TCP:ESTABLISHED | grep -v '^COMMAND')

    if [ -z "$CONNECTIONS" ]; then
        echo "No established connections found on port $PORT."
        echo "Stopping frontend and backend servers."
        
        # Stop the frontend and backend servers
        kill $FRONTEND_PID
        kill $BACKEND_PID
        exit 0
    fi
    sleep 2
done