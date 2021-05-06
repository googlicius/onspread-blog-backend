#!/bin/bash
sleep 30
curl -m 10 --retry 3 --retry-delay 5 http://localhost:1337/categories
