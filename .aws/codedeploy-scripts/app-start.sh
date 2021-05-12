#!/bin/bash
source /home/ec2-user/.bash_profile
cd /var/app/current
yarn build
pm2 start server.js
