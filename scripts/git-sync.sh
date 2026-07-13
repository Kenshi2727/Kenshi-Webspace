#!/usr/bin/env bash

git add .

echo
read -p "Commit message: " MESSAGE

git commit -m "$MESSAGE"

git push