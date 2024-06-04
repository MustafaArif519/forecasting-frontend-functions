#!/bin/bash

# Function to install Node.js on Ubuntu
install_node_ubuntu() {
  sudo apt-get update
  sudo apt-get install -y nodejs npm
}

# Function to install Node.js on MacOS
install_node_mac() {
  brew update
  brew install node
}

# Detect the OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  echo "Detected OS: Linux"
  install_node_ubuntu
elif [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Detected OS: MacOS"
  install_node_mac
else
  echo "Unsupported OS detected. Exiting."
  exit 1
fi

# Navigate to your project directory (replace with your actual project directory)
cd /path/to/your/project

# Install project packages
echo "Installing project packages..."
npm install

# Run npm run dev
echo "Running npm run dev..."
npm run dev