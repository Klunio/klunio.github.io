---
layout: home
title:  "DJANGO LEARNING NOTE"
date:   2019-08-09 14:55:40 +0800
categories: note Django
---

## Django 学习笔记

### 1.安装

Django需要数据库，所以先安装mysql或者oracle，然后`pip install Django`就好

验证安装可以可以在python shell 中输入

```python
import django
print(django.get_version())
>>> 2.1
```



### 2.文件结构

运行命令`django-admin startproject mysite`，可以创建一个django项目

```
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        wsgi.py
```

- manage.py是一个让你用各种方式管理Django项目的命令行工具，更多阅读[django-admin and manage.py](https://docs.djangoproject.com/zh-hans/2.1/ref/django-admin/)
- mysite/ 包含你的所有项目文件
- mysite/settings 是Django的配置文件，更多阅读[Django settings](https://docs.djangoproject.com/zh-hans/2.1/topics/settings/)
- mysite/urls.py是Django的URL声明，类似网站的目录
- mysite/wsgi.py是项目运行哎WSGI兼容的Web服务器上的入口



### 3. 配置数据库

打开mysite/settings.py，这是个包含了 Django 项目设置的 Python 模块。

通常，这个配置文件使用 SQLite 作为默认数据库。如果你不熟悉数据库，或者只是想尝试下 Django，这是最简单的选择。Python 内置 SQLite，所以你无需安装额外东西来使用它。当你开始一个真正的项目时，你可能更倾向使用一个更具扩展性的数据库，例如 PostgreSQL，避免中途切换数据库这个令人头疼的问题。

如果你想使用其他数据库，你需要安装合适的 [database bindings](https://docs.djangoproject.com/zh-hans/2.1/topics/install/#database-installation) ，然后改变设置文件中 [`DATABASES`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-DATABASES) `'default'` 项目中的一些键值：

- [`ENGINE`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-DATABASE-ENGINE) -- 可选值有 `'django.db.backends.sqlite3'`，`'django.db.backends.postgresql'`，`'django.db.backends.mysql'`，或 `'django.db.backends.oracle'`。其它 [可用后端](https://docs.djangoproject.com/zh-hans/2.1/ref/databases/#third-party-notes)。
- [`NAME`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-NAME) - 数据库的名称。如果使用的是 SQLite，数据库将是你电脑上的一个文件，在这种情况下， [`NAME`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-NAME) 应该是此文件的绝对路径，包括文件名。默认值 `os.path.join(BASE_DIR, 'db.sqlite3')` 将会把数据库文件储存在项目的根目录。

如果你不使用 SQLite，则必须添加一些额外设置，比如 [`USER`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-USER) 、 [`PASSWORD`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-PASSWORD) 、 [`HOST`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-HOST) 等等。想了解更多数据库设置方面的内容，请看文档：[`DATABASES`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-DATABASES) 。

编辑 `mysite/settings.py` 文件前，先设置 [`TIME_ZONE`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-TIME_ZONE) 为你自己时区。

此外，关注一下文件头部的 [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-INSTALLED_APPS) 设置项。这里包括了会在你项目中启用的所有 Django 应用。应用能在多个项目中使用，你也可以打包并且发布应用，让别人使用它们。

通常， [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/2.1/ref/settings/#std:setting-INSTALLED_APPS) 默认包括了以下 Django 的自带应用：

- [`django.contrib.admin`](https://docs.djangoproject.com/zh-hans/2.1/ref/contrib/admin/#module-django.contrib.admin) -- 管理员站点， 你很快就会使用它。
- [`django.contrib.auth`](https://docs.djangoproject.com/zh-hans/2.1/topics/auth/#module-django.contrib.auth) -- 认证授权系统。
- [`django.contrib.contenttypes`](https://docs.djangoproject.com/zh-hans/2.1/ref/contrib/contenttypes/#module-django.contrib.contenttypes) -- 内容类型框架。
- [`django.contrib.sessions`](https://docs.djangoproject.com/zh-hans/2.1/topics/http/sessions/#module-django.contrib.sessions) -- 会话框架。
- [`django.contrib.messages`](https://docs.djangoproject.com/zh-hans/2.1/ref/contrib/messages/#module-django.contrib.messages) -- 消息框架。
- [`django.contrib.staticfiles`](https://docs.djangoproject.com/zh-hans/2.1/ref/contrib/staticfiles/#module-django.contrib.staticfiles) -- 管理静态文件的框架。

这些应用被默认启用是为了给常规项目提供方便。

默认开启的某些应用需要至少一个数据表，所以，在使用他们之前需要在数据库中创建一些表。请执行以下命令：

```shell
$ python manage.py migrate
```

### 

### 4. 创建模型

在model.py文件中编写我们需要的类，例如：

```python
from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

这样我们就在数据库中生成了2张表，代码十分清晰，不多加解释

这样的代码给了django很多信息，通过这些信息django可以

- 为这个应用创建数据库shcema(生成 **CREATE TABLE**语句)
- 创建可以与 **Question** 和 **Choice** 对象进行交互的 Python 数据库 API。

>Django 应用是“可插拔”的。你可以在多个项目中使用同一个应用。除此之外，你还可以发布自己的应用，因为它们并不会被绑定到当前安装的 Django 上。

polls的配置信息在app.py这个文件中，所以我们将`polls.apps.PollConfig`这个信息写入 **INSTALLED_APPS**中，接着运行`python manage.py makemigrations polls`,我们就可以得到如下类似的输出：

```shell
Migrations for 'polls':
  polls/migrations/0001_initial.py:
    - Create model Choice
    - Create model Question
    - Add field question to choice
```

通过`makemigrations`命令，Django会检测你对模型文件的修改，并且把修改的部分储存作为一次 *迁移*。

迁移是 Django 对于模型定义（也就是你的数据库结构）的变化的储存形式 - 没那么玄乎，它们其实也只是一些你磁盘上的文件。如果你想的话，你可以阅读一下你模型的迁移数据，它被储存在 `polls/migrations/0001_initial.py` 里。别担心，你不需要每次都阅读迁移文件，但是它们被设计成人类可读的形式，这是为了便于你手动修改它们。

[`sqlmigrate`](https://docs.djangoproject.com/zh-hans/2.1/ref/django-admin/#django-admin-sqlmigrate) 命令接收一个迁移的名称，然后返回对应的 SQL：

```
$ python manage.py sqlmigrate polls 0001
```

我们可以得到类似的输出

```mysql
BEGIN;
--
-- Create model Choice
--
CREATE TABLE "polls_choice" (
    "id" serial NOT NULL PRIMARY KEY,
    "choice_text" varchar(200) NOT NULL,
    "votes" integer NOT NULL
);
--
-- Create model Question
--
CREATE TABLE "polls_question" (
    "id" serial NOT NULL PRIMARY KEY,
    "question_text" varchar(200) NOT NULL,
    "pub_date" timestamp with time zone NOT NULL
);
--
-- Add field question to choice
--
ALTER TABLE "polls_choice" ADD COLUMN "question_id" integer NOT NULL;
ALTER TABLE "polls_choice" ALTER COLUMN "question_id" DROP DEFAULT;
CREATE INDEX "polls_choice_7aa0f6ee" ON "polls_choice" ("question_id");
ALTER TABLE "polls_choice"
  ADD CONSTRAINT "polls_choice_question_id_246c99a640fbbd72_fk_polls_question_id"
    FOREIGN KEY ("question_id")
    REFERENCES "polls_question" ("id")
    DEFERRABLE INITIALLY DEFERRED;

COMMIT;
```

 再次运行 **migrate** 命令，在数据库里创建新定义的模型的数据表

这个 [`migrate`](https://docs.djangoproject.com/zh-hans/2.1/ref/django-admin/#django-admin-migrate) 命令选中所有还没有执行过的迁移（Django 通过在数据库中创建一个特殊的表 `django_migrations` 来跟踪执行过哪些迁移）并应用在数据库上 - 也就是将你对模型的更改同步到数据库结构上。

迁移是非常强大的功能，它能让你在开发过程中持续的改变数据库结构而不需要重新删除和创建表 - 它专注于使数据库平滑升级而不会丢失数据。我们会在后面的教程中更加深入的学习这部分内容，现在，你只需要记住，改变模型需要这三步：

- 编辑 `models.py` 文件，改变模型。
- 运行 [`python manage.py makemigrations`](https://docs.djangoproject.com/zh-hans/2.1/ref/django-admin/#django-admin-makemigrations) 为模型的改变生成迁移文件。
- 运行 [`python manage.py migrate`](https://docs.djangoproject.com/zh-hans/2.1/ref/django-admin/#django-admin-migrate) 来应用数据库迁移。

数据库迁移被分解成生成和应用两个命令是为了让你能够在代码控制系统上提交迁移数据并使其能在多个应用里使用；这不仅仅会让开发更加简单，也给别的开发者和生产环境中的使用带来方便。

### 5. 使用 Django Shell

```python
python3 manage.py shell
```

### 6. 创建管理员账号

```shell
python manage.py createsuperuser
```

### 7. 路由

在配置项中 **ROOT_URLCONF**中设置根路由

例如 `ROOT_URLCONF=mysite.urls`Django将载入mysite.urls模块，然后寻找名为`urlpatterns`的变量并且按序匹配正则表达项。

### 8. 个人的一些总结

​	虽然之前毫无接触过Django（只是简单的使用过flask），而且公司的代码是用的Django rest framework，不过通过阅读代码和官方的教程，目前有以下的理解。

​	首先后台启动靠的就是一个setting文件，里面有各种关键的配置，比如`ALLOWED_HOSTS`、`INSTALLED_APPS`等等，其中`ROOT_URLCONF`定义了根路由节点，`TEMPLATES`定义了模板导入的方式，`DATABASES`定义了数据库的类型，其实还有好多可以配置啦。

​	然后就是路由，路由中的`url`匹配还蛮好理解的，`include`是一个蛮有趣的设定，满足的django即插即用又各个应用组成的理念。通过`include`可以截断前面匹配的url，然后将剩下的部分导入子路由，

​	匹配urlpattern之后就是views了，在views中定义各种类和函数，就可以在访问这个api的时候返回模板、html、httpresponse…模板是一个蛮强的东西，不过目前项目的代码没有用到，所以也没有太深入理解。

​	另一个比较重要的是模型的构建，Django可以直接生成要使用的数据库，并且使用`migrate`可以很便捷的进行修改和增删。创建数据库的步骤大概如下：

- 首先在model文件中定义我们需要的表
- 运行 [`python manage.py makemigrations`](https://docs.djangoproject.com/zh-hans/2.1/ref/django-admin/#django-admin-makemigrations) 为模型的改变生成迁移文件
- 运行 [`python manage.py migrate`](https://docs.djangoproject.com/zh-hans/2.1/ref/django-admin/#django-admin-migrate) 来应用数据库迁移

完成这3步之后会在migrations文件夹中生成模型定义，也是py文件而且蛮容易阅读的。