#!/usr/bin/env bash

echo "Starting Kenshi Webspace..."
echo "[Kenshin Command Activated!]"

cd ../../apps/web/
npm run dev &
Web_PID=$!

cd ../../apps/content-service/
npm run dev &
Content_Service_PID=$!

cd ../../apps/notification-service/
npm run dev &
Notification_Service_PID=$!

cd ../../apps/gateway/
npm run dev &
Gateway_PID=$!

echo "Client PID : $Web_PID"
echo "Content Service PID  : $Content_Service_PID"
echo "Notification Service PID  : $Notification_Service_PID"
echo "Gateway PID  : $Gateway_PID"

wait