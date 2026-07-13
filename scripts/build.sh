#!/usr/bin/env bash

echo "Building frontend..."
cd frontend
npm run build

echo "Building backend..."
cd ../backend
npm run build

echo "Finished."