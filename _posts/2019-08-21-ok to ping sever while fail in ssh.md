---
layout: single
author_profile: true
title:  "服务器能ping通但是无法ssh"
date:   2019-08-20 10:08:40 +0800
categories: linux ssh
classes: wide
toc: false
toc_label: "文章结构"
toc_icon: "align-left"
---



## 服务器能ping通但是无法ssh

### 原因：

> 网上有很多情况是防火墙、权限等问题，都无法解决

1. 首先在本地输入`ssh host@ip -v`查看报错信息
   - 提示：`ssh: connect to host xxx.xxx.xxx.xxx port 22: Connection refused`
2. 好在jupyter服务开着，在jupyter中启动终端，输入`sudo service sshd status`
   - 发现服务被关闭
3. 输入`sudo service ssh restart`，发现启动失败
4. 输入`journalctl -xe`查看报错信息
   - 发现`/usr/sbin/sshd: error while loading shared libraries: libz.so.1:`



这就找到原因了，我们的sshd服务找不到这个共享的库；突然想起我昨天为了配置`LD_LIBRARY_PATH`的时候有把shared lib搞乱



### 解决方法：

- 输入`sudo find / -name libz.so*`
  - 发现我们的libz.so库在/usr/lib下面
- `vi /etc/ld.so.conf`在 `include ld.so.conf.d/*.conf` 下方添加`/usr/lib`
- 保存后执行：`sudo /sbin/ldconfig -v`可能会有读写权限的问题，所以要用`sudo`，另外`-v`可以看到log输出



另外一个办法是在`**LD_LIBRARY_PATH**`变量中添加这个路径，对于其他的.so库文件采用这个方法比较好。