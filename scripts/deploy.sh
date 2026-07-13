#!/usr/bin/env bash

git pull

bash scripts/install.sh

bash scripts/build.sh

echo "Deployment finished."