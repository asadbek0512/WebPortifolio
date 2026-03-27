#!/bin/bash

# PRODUCTION
git reset --hard
git checkout main
git pull origin main

npm install
npm run build
pm2 start "npm run start" --name=PORTFOLIO
