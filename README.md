# Lastratus - Local Area VPS Cloud

Custom Node.js webfrontend for [OpenVZ](https://openvz.org/Main_Page) containers management.

# Requirements

Tested on CentOS 6. Assumes, that OpenVZ is installed and configured based on
OpenVZ quick installation [tutorial](https://openvz.org/Quick_Installation_CentOS_6).

Clone this repository to host machine on */web-frontend*-folder. Create user *nodevzbin*.
Edit sudoers and iptables according instructions found below.
Run `npm install`, `npm start` and check [http://localhost:3000](http://localhost:3000).

This frontend and containers should be accessable only from
private network!!!

Application structure is initially created with express-cli and follows its structure.
*services/*-folder contains helper classes to execute helper bash scripts located 
in folder *bin/vz_scripts/*.


## Basic commands

-  Start server in debug mode 
   `sudo -u nodevzbin DEBUG=web-frontend:* npm start`.
-  Start server with forever 
   `sudo -u nodevzbin FOREVER_ROOT=/web-frontend/logs/forever /usr/bin/forever start -a -l /web-frontend/logs/server.log /web-frontend/bin/www`.
   Using [forever](https://github.com/foreverjs/forever) ensures that script runs continuously. It also 
   forwards stdout to log file.
-  Stop server started with forever 
   `sudo -u nodevzbin FOREVER_ROOT=/web-frontend/logs/forever /usr/bin/forever stop /web-frontend/bin/www`.


## Logs (when using forever)

Server log files are located in *logs/server.log*.


## Helper scripts

Folder *bin/vz_scripts/* contains helper bash scripts, 
which are needed by the web-frontend.
These scripts are meant to run with sudo as nodevzbin user.
See */etc/sudoers*. It should contain following lines:

```bash
nodevzbin    ALL=NOPASSWD:/web-frontend/bin/vz_scripts/list_containers.sh
nodevzbin    ALL=NOPASSWD:/web-frontend/bin/vz_scripts/manage_container.sh
nodevzbin    ALL=NOPASSWD:/web-frontend/bin/vz_scripts/new_container.sh
nodevzbin    ALL=NOPASSWD:/web-frontend/bin/vz_scripts/run_script_in_container.sh
```

*configure/*-folder contains some scripts, which will
install and configure packages for containers. 
They are pretty hackish and each template/os should have
its own configuration scripts.


### nodevzbin user and start up

Express server is started as nodevzbin user to port 3000.
Startup script *bin/cron_reboot.sh* can be added to root cron.
nodevzbin has rights to execute some script with sudo without 
password. See */etc/sudoers*. Web-frontend needs to run some 
scripts as root, for example creating new container. 
These scripts are located in *bin/vz_scripts/* folder.


## Iptables

Make some modifications to default CentOS 6 iptables rules. 
See: [http://openvz.org/Setting_up_an_iptables_firewall#Setting_up_a_firewall_that_allows_per-container_configuration](http://openvz.org/Setting_up_an_iptables_firewall#Setting_up_a_firewall_that_allows_per-container_configuration)

```bash
# Passthru all traffic into containers
iptables -P FORWARD ACCEPT
iptables -F FORWARD

# Open port for web-frontend
iptables -I INPUT 1 -p tcp --dport 3000 -j ACCEPT

# Persist changes
service iptables save
```
