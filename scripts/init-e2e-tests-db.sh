#!/bin/sh
set -e

echo "Running initialization script..."

psql -v ON_ERROR_STOP=1 --username quiz --dbname quiz -f /docker-entrypoint-initdb.d/e2e-tests-db.sql

echo "Initialization script completed."