#!/bin/bash

# This script assumes that apache and php is installed

export DEBIAN_FRONTEND=noninteractive

MYSQL_ROOT_PASSWORD="secret"

# Some magic to get rid of mysql root password prompt
debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_ROOT_PASSWORD"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_ROOT_PASSWORD"
# Install the server with php modules
apt-get -y install mysql-server


# Hopefully memory usage is now reduced and we can install more some packages
apt-get -y install libapache2-mod-auth-mysql php5-mysql

# Restart mysql and apache
service mysql restart
service apache2 restart
