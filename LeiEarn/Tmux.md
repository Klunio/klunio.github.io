---
layout: single
author_profile: false


---

# 帅气的使用终端，程序员利器 —— Tmux

​	在这次的项目开发中，我主要是进行架构设计与后台开发，我们的服务器部署在阿里云的云平台上所以少不了与Terminal打交道，对命令行下的开发速率要求较高

​	虽然在mac下使用iterm2极大的优化了terminal的使用体验（例如历史输入补全等功能),然而还是避免不了在与前端进行交互测试的时候，为了同时修改代码、启动程序、提交代码…等等操作，需要开启一堆terminal窗口，而[Tmux](https://wiki.archlinux.org/index.php/tmux)的 **Session**恰好实现了这样的功能！



### What's Tmux

[Tmux](https://wiki.archlinux.org/index.php/tmux)(termianl multiplexer) 是一个BSD协议发布的终端复用软件，用来在服务器端托管同时运行的Shell。使用该工具，用户可以连接或断开会话，而保持终端在后台运行。



### Install

首先进行安装

```shell
brew install tmux       # OSX
pacman -S tmux          # archlinux
apt-get install tmux    # Ubuntu
yum install tmux        # Centos
```



### Usage

#### tmux的基本结构

​	tmux的结构包括***会话***(session)、***窗口***(window)、***窗格***(pane)三部分，会话的实质是伪终端的集合，每个窗格表示一个伪终端，多个窗格显示在一个屏幕上，这一屏幕就叫窗口。如图：

![屏幕快照 2019-06-29 18.06.12](/Users/guyunquan/klunio.github.io/LeiEarn/img/屏幕快照 2019-06-29 18.06.12.png)



#### tmux的基本操作

​	tmux的基本操作，无非就是用会话、窗口、窗格进行管理，包括创建、关闭、重命名、连接、分离、选择等等。



##### 创建session

```shell
tmux new -s {session_name}
```

使用`<prefix> $`可以重命名当前的Session，其中`<prefix>`指的是tmux中的前缀键，默认值是`Ctrl+b`。



##### 显示会话列表

```
tmux ls
```

##### 连接上一个会话

```
tmux a or tmux attach
```

##### 连接指定会话

```
tmux a -t {session_name}
```

##### 关闭指定会话

```
tmux kill-session -t {session_name}
```

##### 在<会话中列出所有session并切换

```
prefix> s
```



###### 以上的指令都是对session的操作，涵盖了基本的session操作，在本次项目中已经很够用了。接下来是进入到会话后的一些使用的快捷键。



##### 创建一个新窗口

```
<prefix> c
```

##### 列出所有窗口，并切换

```
<prefix> w
```

