#!/bin/bash

export DEBIAN_FRONTEND=noninteractive

locale-gen en_US.UTF-8
# Set all locales to en_US.UTF-8
update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 LC_MESSAGES=POSIX

dpkg-reconfigure locales
