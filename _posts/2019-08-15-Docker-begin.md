---
layout: single
author_profile: true
title:  "Docker Beginner"
date:   2019-08-15 14:03:40 +0800
categories: note docker
classes: wide
toc: true
toc_label: "文章结构"
toc_icon: "align-left"
---



> refer : [https://www.qikqiak.com/k8s-book/docs/2.Docker%20%E7%AE%80%E4%BB%8B.html](https://www.qikqiak.com/k8s-book/docs/2.Docker 简介.html)



### Docker 架构

Docker 使用 C/S （客户端/服务器）体系的架构，Docker 客户端与 Docker 守护进程通信，Docker 守护进程负责构建，运行和分发 Docker 容器。Docker 客户端和守护进程可以在同一个系统上运行，也可以将 Docker 客户端连接到远程 Docker 守护进程。Docker 客户端和守护进程使用 REST API 通过`UNIX`套接字或网络接口进行通信。 ![docker-structrue](https://www.qikqiak.com/k8s-book/docs/images/docker-structrue.png)

- Docker Damon：dockerd，用来监听 Docker API 的请求和管理 Docker 对象，比如镜像、容器、网络和 Volume。
- Docker Client：docker，docker client 是我们和 Docker 进行交互的最主要的方式方法，比如我们可以通过 docker run 命令来运行一个容器，然后我们的这个 client 会把命令发送给上面的 Dockerd，让他来做真正事情。
- Docker Registry：用来存储 Docker 镜像的仓库，Docker Hub 是 Docker 官方提供的一个公共仓库，而且 Docker 默认也是从 Docker Hub 上查找镜像的，当然你也可以很方便的运行一个私有仓库，当我们使用 docker pull 或者 docker run 命令时，就会从我们配置的 Docker 镜像仓库中去拉取镜像，使用 docker push 命令时，会将我们构建的镜像推送到对应的镜像仓库中。
- Images：镜像，镜像是一个只读模板，带有创建 Docker 容器的说明，一般来说的，镜像会基于另外的一些基础镜像并加上一些额外的自定义功能。比如，你可以构建一个基于 Centos 的镜像，然后在这个基础镜像上面安装一个 Nginx 服务器，这样就可以构成一个属于我们自己的镜像了。
- Containers：容器，容器是一个镜像的可运行的实例，可以使用 Docker REST API 或者 CLI 来操作容器，容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的[命名空间](https://en.wikipedia.org/wiki/Linux_namespaces)。因此容器可以拥有自己的 **root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间**。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。
- 底层技术支持：Namespaces（做隔离）、CGroups（做资源限制）、UnionFS（镜像和容器的分层） the-underlying-technology Docker 底层架构分析



### 镜像的基本操作



#### 获取镜像

Docker 官方提供了一个公共的镜像仓库：[Docker Hub](https://hub.docker.com/explore/)，我们就可以从这上面获取镜像，获取镜像的命令：docker pull，格式为：

```shell
$ docker pull [选项] [Docker Registry 地址[:端口]/]仓库名[:标签] 
```

- Docker 镜像仓库地址：地址的格式一般是 <域名/IP>[:端口号]，默认地址是 Docker Hub。
- 仓库名：这里的仓库名是两段式名称，即 <用户名>/<软件名>。对于 Docker Hub，如果不给出用户名，则默认为 library，也就是官方镜像。比如：



#### 运行

有了镜像后，我们就能够以这个镜像为基础启动并运行一个容器。以上面的 ubuntu:16.04 为例，如果我们打算启动里面的 bash 并且进行交互式操作的话，可以执行下面的命令。

```shell
$ docker run -it --rm \
    ubuntu:16.04 \
    /bin/bash

root@e7009c6ce357:/# cat /etc/os-release
NAME="Ubuntu"
VERSION="16.04.4 LTS, Trusty Tahr"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 16.04.4 LTS"
VERSION_ID="16.04"
HOME_URL="http://www.ubuntu.com/"
SUPPORT_URL="http://help.ubuntu.com/"
BUG_REPORT_URL="http://bugs.launchpad.net/ubuntu/"
```

`docker run`就是运行容器的命令，具体格式我们会在后面的课程中进行详细讲解，我们这里简要的说明一下上面用到的参数。

- -it：这是两个参数，一个是 -i：交互式操作，一个是 -t 终端。我们这里打算进入 bash 执行一些命令并查看返回结果，因此我们需要交互式终端。
- --rm：这个参数是说容器退出后随之将其删除。默认情况下，为了排障需求，退出的容器并不会立即删除，除非手动 docker rm。我们这里只是随便执行个命令，看看结果，不需要排障和保留结果，因此使用`--rm`可以避免浪费空间。
- ubuntu:16.04：这是指用 ubuntu:16.04 镜像为基础来启动容器。
- bash：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 bash。

进入容器后，我们可以在 Shell 下操作，执行任何所需的命令。这里，我们执行了`cat /etc/os-release`，这是 Linux 常用的查看当前系统版本的命令，从返回的结果可以看到容器内是 Ubuntu 16.04.4 LTS 系统。最后我们通过 `exit` 退出了这个容器。



#### 列出镜像

```shell
$ docker image ls
```

列表包含了**仓库名、标签、镜像 ID、创建时间以及所占用的空间**。镜像 ID 则是镜像的唯一标识，一个镜像可以对应多个标签。



#### 镜像大小

`docker image ls`列表中的镜像体积总和并非是所有镜像实际硬盘消耗。由于 Docker 镜像是多层存储结构，并且可以继承、复用，因此不同镜像可能会因为使用相同的基础镜像，从而拥有共同的层。由于 Docker 使用`Union FS`，相同的层只需要保存一份即可，因此实际镜像硬盘占用空间很可能要比这个列表镜像大小的总和要小的多。你可以通过以下命令来便捷的查看镜像、容器、数据卷所占用的空间。

```shell
$ docker system df
```



#### 新建并启动

所需要的命令主要为`docker run`，下面的命令则启动一个 bash 终端，允许用户进行交互。

```shell
$ docker run -t -i ubuntu:16.04 /bin/bash
root@af8bae53bdd3:/#
```

其中，`-t`选项让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上，`-i`则让容器的标准输入保持打开。 在交互模式下，用户可以通过所创建的终端来输入命令，例如：

```shell
root@af8bae53bdd3:/# pwd
/
root@af8bae53bdd3:/# ls
bin boot dev etc home lib lib64 media mnt opt proc root run sbin srv sys tmp usr var
```

当利用`docker run`来创建容器时，Docker 在后台运行的标准操作包括：

- 检查本地是否存在指定的镜像，不存在就从公有仓库下载
- 利用镜像创建并启动一个容器
- 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
- 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
- 从地址池配置一个 ip 地址给容器
- 执行用户指定的应用程序
- 执行完毕后容器被终止



#### 启动已终止容器

`docker container start`命令，直接将一个已经终止的容器启动运行。



#### 后台运行

更多的时候，需要让 Docker 在后台运行而不是直接把执行命令的结果输出在当前宿主机下。此时，可以通过添加`-d`参数来实现。

下面举两个例子来说明一下。

如果不使用`-d`参数运行容器。

```shell
$ docker run ubuntu:16.04 /bin/sh -c "while true; do echo hello world; sleep 1; done"
hello world
hello world
hello world
hello world
```

容器会把输出的结果 (STDOUT) 打印到宿主机上面。如果使用了`-d`参数运行容器。

```shell
$ docker run -d ubuntu:16.04 /bin/sh -c "while true; do echo hello world; sleep 1; done"
77b2dc01fe0f3f1265df143181e7b9af5e05279a884f4776ee75350ea9d8017a
```

此时容器会在后台运行并不会把输出的结果 (STDOUT) 打印到宿主机上面(输出结果可以用 docker logs 查看)。

> 注： 容器是否会长久运行，是和 docker run 指定的命令有关，和 -d 参数无关。

使用`-d`参数启动后会返回一个唯一的 id，也可以通过`docker container ls`命令来查看容器信息。

```shell
$ docker container ls
CONTAINER ID  IMAGE         COMMAND               CREATED        STATUS       PORTS NAMES
77b2dc01fe0f  ubuntu:16.04  /bin/sh -c 'while tr  2 minutes ago  Up 1 minute        agitated_wright
要获取容器的输出信息，可以通过 docker container logs 命令。
$ docker container logs [container ID or NAMES]
hello world
hello world
hello world
. . .
```



#### 终止容器

可以使用`docker container stop`来终止一个运行中的容器。此外，当 Docker 容器中指定的应用终结时，容器也自动终止。

例如对于上一章节中只启动了一个终端的容器，用户通过 exit 命令或 Ctrl+d 来退出终端时，所创建的容器立刻终止。终止状态的容器可以用`docker container ls -a` 命令看到。例如

```shell
$ docker container ls -a
CONTAINER ID        IMAGE                    COMMAND                CREATED             STATUS                          PORTS               NAMES
ba267838cc1b        ubuntu:16.04             "/bin/bash"            30 minutes ago      Exited (0) About a minute ago                       trusting_newton
```

处于终止状态的容器，可以通过`docker container start`命令来重新启动。

此外，`docker container restart`命令会将一个运行态的容器终止，然后再重新启动它。



#### 进入容器

在使用`-d`参数时，容器启动后会进入后台。某些时候需要进入容器进行操作：**exec 命令 -i -t 参数**。

只用`-i`参数时，由于没有分配伪终端，界面没有我们熟悉的`Linux`命令提示符，但命令执行结果仍然可以返回。 当`-i -t`参数一起使用时，则可以看到我们熟悉的 `Linux`命令提示符。

```shell
$ docker run -dit ubuntu:16.04
69d137adef7a8a689cbcb059e94da5489d3cddd240ff675c640c8d96e84fe1f6

$ docker container ls
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
69d137adef7a        ubuntu:16.04       "/bin/bash"         18 seconds ago      Up 17 seconds                           zealous_swirles

$ docker exec -i 69d1 bash
ls
bin
boot
dev
...

$ docker exec -it 69d1 bash
root@69d137adef7a:/#
```

如果从这个 stdin 中 exit，不会导致容器的停止。这就是为什么推荐大家使用`docker exec`的原因。

> 更多参数说明请使用`docker exec --help`查看。



#### 

#### 删除容器

可以使用`docker container rm`来删除一个处于终止状态的容器。例如:

```shell
$ docker container rm  trusting_newton
trusting_newton
```

也可用使用`docker rm`容器名来删除，如果要删除一个运行中的容器，可以添加`-f`参数。Docker 会发送 `SIGKILL`信号给容器。

用`docker container ls -a (或者docker ps -a)`命令可以查看所有已经创建的包括终止状态的容器，如果数量太多要一个个删除可能会很麻烦，用下面的命令可以清理掉所有处于终止状态的容器。

```shell
$ docker container prune
```

或者

```shell
$ docker ps -aq
```



#### 删除本地镜像

如果要删除本地的镜像，可以使用`docker image rm·命令，其格式为：

```shell
$ docker image rm [选项] <镜像1> [<镜像2> ...]
```

或者

```shell
$ docker rmi 镜像名
```

或者用 ID、镜像名、摘要删除镜像 其中，<镜像> 可以是 镜像短 ID、镜像长 ID、镜像名 或者 镜像摘要。

