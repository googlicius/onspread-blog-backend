#!/bin/bash
source /home/ec2-user/.bash_profile
cd /var/app/current
yarn --prefer-offline --prod
