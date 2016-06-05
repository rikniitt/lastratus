#!/bin/bash

export DEBIAN_FRONTEND=noninteractive

apt-get -y install apache2

# Enable mod_rewrite
a2enmod rewrite

echo -e "\n# Custom fixes\n" >> /etc/apache2/apache2.conf
echo "ServerSignature Off" >> /etc/apache2/apache2.conf
echo "ServerTokens Prod" >> /etc/apache2/apache2.conf
# Get rid of "Could not reliably determine..."
echo "ServerName $HOSTNAME" >> /etc/apache2/apache2.conf

service apache2 start
