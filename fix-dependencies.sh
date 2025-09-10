#!/bin/bash

# Dependency Fix Script
# This script resolves dependency conflicts in the current package setup

echo "Starting dependency conflict resolution..."

# Backup package.json
echo "Backing up package.json to package.json.conflict-fix.bak..."
cp package.json package.json.conflict-fix.bak

# Remove node_modules and package-lock.json
echo "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

# Fix specific dependency conflicts
echo "Installing React and core dependencies first..."
npm install --no-save --legacy-peer-deps react@18.2.0 react-dom@18.2.0

echo "Installing testing libraries with compatible versions..."
npm install --no-save --legacy-peer-deps @testing-library/react@13.4.0 @testing-library/jest-dom@5.16.5 @testing-library/user-event@14.4.3

echo "Installing remaining packages..."
npm install --legacy-peer-deps

echo "Checking if all dependencies were installed correctly..."
npm ls react react-dom @testing-library/react

echo ""
echo "Dependency fixes complete. Please verify the application works correctly."
echo "If issues persist, you can restore the backup with:"
echo "cp package.json.conflict-fix.bak package.json && npm install --legacy-peer-deps"
