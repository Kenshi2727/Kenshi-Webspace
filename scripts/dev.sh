#!/usr/bin/env bash

echo "🚀 Starting Kenshi Webspace..."

cd frontend
npm run dev &
FRONTEND_PID=$!

cd ../backend
npm run dev &
BACKEND_PID=$!

echo "Frontend PID : $FRONTEND_PID"
echo "Backend PID  : $BACKEND_PID"

wait