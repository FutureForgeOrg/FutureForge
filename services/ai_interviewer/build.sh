#!/usr/bin/env bash
# build.sh

echo "Starting build process..."

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

echo "Build completed successfully!"