#!/bin/bash

cat pids | xargs kill
rm pids
