#!/bin/sh
http-server -p 80 ./vue &
http-server -p 81 ./react &
http-server -p 82 ./html &