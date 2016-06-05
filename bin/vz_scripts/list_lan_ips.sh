#!/bin/bash

# This doesn't need root privileges

nmap -sP 192.168.0.* | grep -oE '\b([0-9]{1,3}\.){3}[0-9]{1,3}\b'
