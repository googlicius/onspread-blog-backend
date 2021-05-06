#!/bin/bash
if [ -d /var/app/current ]; then
    sudo rm -rf /var/app/current
fi
sudo mkdir -vp /var/app/current
sudo chown ec2-user:ec2-user /var/app/current

source /home/ec2-user/.bash_profile

pm2 flush
