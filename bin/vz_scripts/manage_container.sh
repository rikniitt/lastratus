#!/bin/bash

CMD=$1
CTID=$2

if [[ $CMD != "" && $CTID != "" ]]; then
    /usr/sbin/vzctl $CMD $CTID
else
    echo "Please give CMD and CTID"
    echo
fi
