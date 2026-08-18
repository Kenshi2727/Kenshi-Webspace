#!/usr/bin/env bash

echo "Starting Kenshi Webspace..."
echo "[Kenshin Command Activated!]"

cd ../../apps/web
npm run dev &
Client_PID=$!

cd ../../apps/content-service
npm run dev &
Content_Service_PID=$!

echo "Client PID : $Client_PID"
echo "Content Service PID  : $Content_Service_PID"

wait