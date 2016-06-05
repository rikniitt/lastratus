#!/bin/bash

# This script assumes that apache is installed

export DEBIAN_FRONTEND=noninteractive

apt-get -y install libapache2-mod-php5
# Some extra modules
apt-get -y install php5-curl php5-mcrypt
