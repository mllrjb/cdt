@echo off

call set NODE_ENV=production
start .\node.exe dist\server.js /k
