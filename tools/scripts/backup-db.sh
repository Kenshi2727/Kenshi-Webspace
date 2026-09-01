#!/usr/bin/env bash

DATE=$(date +%F_%H-%M-%S)

mkdir -p backups

pg_dump "$DATABASE_URL" > backups/$DATE.sql

echo "Backup saved."