#!/bin/bash
source /home/ec2-user/.bash_profile
cd /var/app/current
pm2 start server.js
