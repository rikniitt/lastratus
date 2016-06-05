#!/bin/bash

CTID=$1
TEMPLATE=$2
IP=$3
NAME=$4
PWD=$5

if [[ $PWD == "" ]]; then
    PASS='secret'
else
    PASS=$PWD
fi

if [[ $CTID != "" && $TEMPLATE != "" && $IP != "" && $NAME != "" ]]; then
    # Create an OpenVz container
    /usr/sbin/vzctl create $CTID --ostemplate $TEMPLATE --config basic

    # Set container name and hostname
    /usr/sbin/vzctl set $CTID --name $NAME --save
    /usr/sbin/vzctl set $CTID --hostname $NAME --save

    # Set some basic root password
    /usr/sbin/vzctl set $CTID --userpasswd root:$PASS --save

    # Trying some memory limits
    /usr/sbin/vzctl set $CTID --vmguarpages 1024M --save
    /usr/sbin/vzctl set $CTID --oomguarpages 1024M --save
    /usr/sbin/vzctl set $CTID --privvmpages 1024M:1024M --save

    # Basic network conf
    /usr/sbin/vzctl set $CTID --ipadd $IP --save
    /usr/sbin/vzctl set $CTID --nameserver 62.236.255.11 --save
else
  echo "Please give CTID TEMPLATE IP and NAME"
  echo 
fi 

