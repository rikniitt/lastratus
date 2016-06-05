#!/bin/bash

# This doesn't need root privileges

ls -1 /vz/template/cache | sed -e 's/\(.*\)\..*\..*/\1/'
