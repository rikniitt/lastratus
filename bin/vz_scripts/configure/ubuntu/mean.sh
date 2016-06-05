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

# Install mongodb from 3rd party repository
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
apt-get update
apt-get install -y mongodb-org

# Use small journal files so that mongo can 
# start with 2GB disk space
echo -e "\nsmallfiles=true\n" >> etc/mongod.conf
service mongod start

# Needed nodejs packages
npm install -g grunt-cli gulp bower

# Install mean-cli
npm install -g mean-cli

