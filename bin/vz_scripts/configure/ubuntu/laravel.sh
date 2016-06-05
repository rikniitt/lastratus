#!/bin/bash

# This script assumes that apache, php and mysql is installed
# and that mysql root password is same as in hardcoded
# value in mysql.sh script.

export DEBIAN_FRONTEND=noninteractive

MYSQL_ROOT_PASSWORD="secret"
APACHE_USER=`ps axo user,group,comm | egrep '(apache|httpd)' | grep -v ^root | uniq | cut -d\  -f 1`

# Enable mcrypt php extension
php5enmod mcrypt
service apache2 restart

# Create new folder for project
cd /
mkdir www_dir
cd $_
# Download composer 
curl -sS https://getcomposer.org/installer | php
# Use it to create new laravel project
php composer.phar create-project laravel/laravel --prefer-dist
# We are making assumption that this will 
# create folder named laravel
mv composer.phar laravel/
chown -R $APACHE_USER:$APACHE_USER laravel

# Create apache virtual host config
touch /etc/apache2/sites-available/laravel.conf
cat > /etc/apache2/sites-available/laravel.conf <<EOL
<VirtualHost *:80>

    DocumentRoot /www_dir/laravel/public

    <Directory /www_dir/laravel/public/>
        DirectoryIndex index.php
        AllowOverride All
        Require all granted
    </Directory>

</VirtualHost>
EOL
# Enable and disable virtual hosts
a2dissite 000-default && a2ensite laravel && service apache2 reload

