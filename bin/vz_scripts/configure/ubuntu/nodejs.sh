#!/bin/bash

# Assume that apt_update and locale has executed

export DEBIAN_FRONTEND=noninteractive

apt-get -y install python-software-properties python build-essential

# Add 3rd party repository to install node from
curl -sL https://deb.nodesource.com/setup | bash -
apt-get update
apt-get -y install nodejs

node -v
npm -v


# Some global packages
npm install -g grunt-cli gulp bower mocha yo


