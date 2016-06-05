#!/bin/bash

CTID=$1
SCRIPT=$2

if [[ $CTID != "" && $SCRIPT != "" ]]; then
    /usr/sbin/vzctl runscript $CTID $SCRIPT
else
    echo "Please give CTID and SCRIPT"
    echo
fi
