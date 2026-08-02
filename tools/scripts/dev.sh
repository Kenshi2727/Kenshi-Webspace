#!/usr/bin/env bash

echo "Starting Kenshi Webspace..."
echo "[Kenshin Command Activated!]"

cd Client
npm run dev &
Client_PID=$!

cd ../Server
npm run dev &
Main_Server_PID=$!

echo "Client PID : $Client_PID"
echo "Main Server PID  : $Main_Server_PID"

wait