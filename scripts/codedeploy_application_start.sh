#!/bin/bash
# Stop all servers and start the server
export HOME="/home/ubuntu/"
sudo PM2_HOME=/home/ubuntu/.pm2 pm2 list
pm2 stop all
pm2 start /home/ubuntu/my-app1/server/index.js