#!/usr/bin/env bash

echo "Installing frontend..."
cd frontend
npm install

echo "Installing backend..."
cd ../backend
npm install

echo "Done."