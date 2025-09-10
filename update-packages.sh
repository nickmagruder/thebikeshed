#!/bin/bash

# Package Update Helper Script

# Make sure we're in the project directory
echo "Making sure we're in the project directory..."
cd "$(dirname "$0")"

echo "Starting package update process..."

# Backup package.json
echo "Backing up package.json to package.json.bak..."
cp package.json package.json.bak

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force

# Remove node_modules and package-lock.json
echo "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

# Install packages with legacy peer deps to avoid conflicts
echo "Installing updated packages with --legacy-peer-deps flag..."
npm install --legacy-peer-deps

# Run post-install checks
echo "Running post-install checks..."

# Check if react-scripts installed correctly
if ! npm list react-scripts > /dev/null 2>&1; then
  echo "react-scripts not found. Attempting to reinstall..."
  npm install react-scripts@5.0.1 --legacy-peer-deps
fi

echo "Package update process completed."
echo ""
echo "IMPORTANT NEXT STEPS:"
echo "---------------------"
echo "1. Review the MIGRATION.md document for code changes needed"
echo "2. Update your index.js file to use createRoot from react-dom/client"
echo "3. Update React Router routes to use the new syntax"
echo "4. Test the application thoroughly after making changes"
echo ""
echo "If you encounter issues, refer to the individual package migration guides:"
echo "- React 18: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html"
echo "- React Router 6: https://reactrouter.com/en/main/upgrading/v5"
echo "- Firebase 10: https://firebase.google.com/docs/web/modular-upgrade"
echo ""
echo "You can revert to previous package versions using: cp package.json.bak package.json && npm install"
