#!/bin/bash

export DEBIAN_FRONTEND=noninteractive


# Ubuntu 14.04 template has apache installed?
# Uninstall it
apt-get -y purge apache2


# Install Nginx
apt-get -y install nginx


# Install mysql
MYSQL_ROOT_PASSWORD="secret"
# Some magic to get rid of mysql root password prompt
debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_ROOT_PASSWORD"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_ROOT_PASSWORD"
# Install the server
apt-get -y install mysql-server


# Install php, fastcgi and additional modules
apt-get -y install php5-fpm php5-mysql php5-curl php5-mcrypt


# Configure fastcgi
sed -i -e 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g' /etc/php5/fpm/php.ini
service php5-fpm restart


# Create server document root
cd /
mkdir document_root
mkdir document_root/public
# And some place holder file
touch /document_root/public/index.php
cat > /document_root/public/index.php <<EOL
<h1 style="text-align:center">Hello LEMP</h1>
<?php
    phpinfo();
?>
EOL
NGINX_USER=`ps axo user,group,comm | egrep '(nginx|httpd)' | grep -v ^root | uniq | cut -d\  -f 1`
chown -R $NGINX_USER:$NGINX_USER /document_root



# Configure nginx
mv /etc/nginx/sites-available/default /etc/nginx/sites-available/default.old
touch /etc/nginx/sites-available/default
cat > /etc/nginx/sites-available/default <<EOL
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    root /document_root/public;
    index index.php index.html index.htm;

    server_name server_domain_name_or_IP;

    location / {
        try_files \$uri \$uri/ =404;
    }

    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }

    location ~ \.php\$ {
        try_files \$uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)\$;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        include fastcgi_params;
    }
}
EOL
# Restart the server
service nginx restart
