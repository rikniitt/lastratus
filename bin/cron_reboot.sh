#!/bin/bash

## Script to start custom web frontend
#  nodejs application.
#  Run from root cron.


# Start node application as nodevzbin user.
su nodevzbin -c "FOREVER_ROOT=/web-frontend/logs/forever /usr/bin/forever start -a -l /web-frontend/logs/server.log /web-frontend/bin/www"
