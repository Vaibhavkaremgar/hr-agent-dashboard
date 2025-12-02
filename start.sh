#!/bin/bash

echo "🔧 Installing backend dependencies..."
cd server
npm install

echo "🔧 Installing frontend dependencies..."
cd ../client
npm install

echo "📦 Building frontend..."
npm run build

echo "🚀 Starting backend server..."
cd ../server
npm run start
