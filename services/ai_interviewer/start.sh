#!/usr/bin/env bash
# start.sh

echo "Starting AI Interviewer application..."

# Run the application with Gunicorn
exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 2 --timeout 0 run:app