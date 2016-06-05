#!/bin/bash

# This script assumes that apache, php and mysql is installed
# and that mysql root password is same as in hardcoded
# value in mysql.sh script.

export DEBIAN_FRONTEND=noninteractive

MYSQL_ROOT_PASSWORD="secret"
APACHE_USER=`ps axo user,group,comm | egrep '(apache|httpd)' | grep -v ^root | uniq | cut -d\  -f 1`

cd /
mkdir www_document_root
cd $_
# Download lates wordpress
wget https://wordpress.org/latest.zip
# Extract it
unzip latest.zip
# We are making assumption that this will 
# create folder named wordpress
chown -R $APACHE_USER:$APACHE_USER wordpress

# Copy ubuntus default apache virtual host conf
cp /etc/apache2/sites-available/default /etc/apache2/sites-available/wordpress
# Use sed to change default /var/www to point new created dir
sed -i -e 's/var\/www/www_document_root\/wordpress/g' /etc/apache2/sites-available/wordpress
# Enable and disable virtual hosts
a2dissite default && sudo a2ensite wordpress && sudo service apache2 reload

# Create database for wordpress
mysql -uroot -p"$MYSQL_ROOT_PASSWORD" -e'CREATE DATABASE wordpress'
