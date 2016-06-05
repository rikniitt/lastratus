#!/bin/bash

# Install ruby and rails on ubuntu 14.04
# https://gorails.com/setup/ubuntu/14.04

# Assume that apt_update and locale has executed

export DEBIAN_FRONTEND=noninteractive
export HOME='/root'


# Install needed packages like sqlite
apt-get -y install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev

# Install rbenv
cd /root
git clone git://github.com/sstephenson/rbenv.git .rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> /root/.bashrc
# sourcing bashr not working because non-interactive shell
export PATH="$HOME/.rbenv/bin:$PATH"
echo 'eval "$(rbenv init -)"' >> /root/.bashrc
eval "$(rbenv init -)"
# Install ruby-build
git clone git://github.com/sstephenson/ruby-build.git /root/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> /root/.bashrc
export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"

git clone https://github.com/sstephenson/rbenv-gem-rehash.git /root/.rbenv/plugins/rbenv-gem-rehash

# Use rbenv to install ruby
rbenv install 2.2.2
rbenv global 2.2.2
ruby -v

# Do not install local docs
echo "gem: --no-ri --no-rdoc" > /root/.gemrc
# Install bundel
gem install bundler


# Install rails
# which needs nodejs.
# Add 3rd party repository to install node from
curl -sL https://deb.nodesource.com/setup | bash -
apt-get update
apt-get -y install nodejs
node -v
npm -v
# and now with the rails
gem install rails -v 4.2.1
rbenv rehash
rails -v

# Finally create some hello application
cd /
rails new helloapp
cd helloapp
rake db:create
MY_IP=`ifconfig | grep 'inet addr:192.168.0' | cut -d: -f2 | awk '{ print $1}'`
# Start rails server as daemon (have to manually kill it)
rails server --daemon --port 80 --binding $MY_IP
