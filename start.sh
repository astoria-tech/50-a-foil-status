#!/bin/bash

npm -C server run dev 2>&1 > server.log &
echo $! > pids
npm -C browser start 2>&1 > browser.log &
echo $! >> pids
