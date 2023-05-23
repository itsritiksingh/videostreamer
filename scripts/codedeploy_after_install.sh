#!/bin/bash
sudo chmod -R 777 /home/ubuntu/my-app1
cd /home/ubuntu/my-app1/server
npm install --omit=dev
