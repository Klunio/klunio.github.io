---
layout: single
author_profile: true
title:  "Cloudera Clusterdock"
date:   2019-08-20 10:08:40 +0800
categories: docker hadoop
classes: wide
toc: false
toc_label: "文章结构"
toc_icon: "align-left"
---



> The project development need a distributed cluster file system rendering the exploitation environment like HDFS and HIVE. Nevertheless, we have only one server！My manager mentioned that cloudera can satisfy our need to produce a 'fake' distributed cluster by using docker. Let's do it!



## 0. Before we start …

This article is organized with two parts. Firstly, I will introduce how to generate a distributed cluster system by Cloudera Cluster, including single nodes, two nodes and mutiple nodes. Next, I wil present the way of interacting with cluster's HDFS and HIVE system on a remoted sever through Pyhive and Pyhdfs.

###### Have only contacted with docker technique for a week, as a beginner, most of my perceives are superficial, therefore I would modify and refine this document after futrue learning.



## 1. Build our cluster

 

### Single node



#### Installtaion

```shell
docker pull cloudera/quickstart:latest
```

after you finish the installation, type the command`docker images` to if you have succeeded in installing the `cloudera`, like this:

![image-20190820104356555](/Users/guyunquan/Library/Application Support/typora-user-images/image-20190820104356555.png)



#### Run

```dockerfile
docker run --hostname=quickstart.cloudera --privileged=true -t -i -d -p 8888:8888 -p 80:80 -p 7180:7180 cloudera/quickstart  /usr/bin/docker-quickstart
```



enter the container:

```dockerfile
docker exec -it [container name] /bin/bash
```



#### HUE

The `HUE` server is started in port 8888, we can visti `localhost:8888` where the username and password are both `cloudera`. The `HUE` provide interfaces of file system that we can easily access our `dfs` use the `File browser` in the top right corner of the page:

![image-20190820105738404](/Users/guyunquan/Library/Application Support/typora-user-images/image-20190820105738404.png)

More information about `HUE` is available in [http://gethue.com/](http://gethue.com/)



#### Cloudera Manager

The `cloudera manager` acquires 