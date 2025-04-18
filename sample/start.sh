#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Build the parent library
echo "Building the react-chrono library..."
cd ..
pnpm rollup
cd sample

# Start the app
echo "Starting the React Chrono sample app..."
pnpm start 