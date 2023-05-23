#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 
sudo chmod -R 777 /home/ubuntu/my-app1
cd /home/ubuntu/my-app1/server
export HOME="/home/ubuntu/"
sudo PM2_HOME=/home/ubuntu/.pm2 pm2 list
npm install --omit=dev
pm2 stop all
pm2 start /home/ubuntu/my-app1/server/index.js
