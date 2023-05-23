#!/bin/bash
# Install node.js and PM2 globally
sudo apt-get update
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
sudo npm install pm2 -g
sudo rm -rf /home/ubuntu/my-app1
