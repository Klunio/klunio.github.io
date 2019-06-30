---
layout: single
author_profile: false


---

# Flask 实战

### Intro

Flask是一个基于python开发的开源框架，官方文档称其为"微"框架，表示Flask的目的是保持核心简单而又可扩展。Flask不会替你做出许多决定，不包含数据库抽象层、表单验证或者其他已有的库可以处理的东西。然而，Flask通过扩展为你的应用添加这些功能。

### Usage

#### Install

```
pip install flask
```

完整的flask开发环境可能需要内容组件比较多, 可以将所有相关的包放置在一个txt文件，然后使用`pip install -r requires.txt`进行安装。

#### 启动

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'
```

- 首先我们导入了Flask类。该类的实例将会成为我们WSGI应用。
- 接着我们创建一个该类的实例。第一个参数是应用模块或者包的名称。如果你使用 一个单一模块（就像本例），那么应当使用 `__name__` ，因为名称会根据这个 模块是按应用方式使用还是作为一个模块导入而发生变化（可能是 ‘__main__’ ， 也可能是实际导入的名称）。这个参数是必需的，这样 Flask 才能知道在哪里可以 找到模板和静态文件等东西。更多内容详见 [`Flask`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Flask) 文档。
- 然后我们使用 [`route()`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.Flask.route) 装饰器来告诉 Flask 触发函数的 URL 。
- 函数名称被用于生成相关联的 URL 。函数最后返回需要在用户浏览器中显示的信息。

#### 初始化简介

```python
# Flask实例的源码：
class Flask(_PackageBoundObject):
    def __init__(self, import_name,  # 指定应用的名字和工程目录，默认为__name__
                static_path=None,  # 是静态文件存放的路径，会赋值给static_url_path参数
                static_url_path=None,  # 设置静态文件路由的前缀，默认为“/static”
                static_folder='static', # 静态文件的存放目录， 默认值为"static"
                template_folder='templates', # 模板文件的存放目录，默认值为"templates"
                instance_path=None, # 设置配置文件的路径，instance_relative_config=True情况下生效
                instance_relative_config=False # 设置为True表示配置文件相对于实例路径而不是根路径
                root_path=None) # 应用程序的根路径
```



```python
app.run(host=None, # 设置ip，默认127.0.0.1
        port=None, # 设置端口，默认5000
        debug=None)  # 设置是否开启调试，默认false
```

#### 路由

FLask中，使用route()装饰器来把函数绑定到URL，下面是官方的例子：

```python
@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'
    
@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % subpath
```

通过把 URL 的一部分标记为 `<variable_name>` 就可以在 URL 中添加变量。标记的 部分会作为关键字参数传递给函数。通过使用 `<converter:variable_name>` ，可以选择性的加上一个转换器。

转换器类型：

| string | （缺省值） 接受任何不包含斜杠的文本 |
| ------ | ----------------------------------- |
| int    | 接受正整数                          |
| float  | 接受正浮点数                        |
| path   | 类似 `string` ，但可以包含斜杠      |
| uuid   | 接受 UUID 字符串                    |

#### URL构建与查看

`url_for()`函数用于构建指定函数的URL。也可以使用`url_for()`获取某函数对应的URL。

```python
@app.route('/loginto')
def login():
    print(url_for('login'))   # 会打印出网址中主机名后的部分
    return 'Hello world!'
```

#### HTTP方法与参数获取

使用route装饰器的methods参数可以设置接收到get或post方法，缺省情况下，一个路由只回应GET请求：

```python
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()
```

通过`request.get_data()`获得传输的数据包，然后转换为json格式：

```python
from flask import request
import json
@app.route("/api/v1/login", methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_data()
        json_data = json.loads(data.decode('utf-8'))
        print(json_data)
```

也可以使用`form`来处理表单信息：

```python
@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['username'],
                       request.form['password']):
            return log_the_user_in(request.form['username'])
        else:
            error = 'Invalid username/password'
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return render_template('login.html', error=error)
```

最好使用`get`方法来访问表单中的属性，因为`get`在该属性不存在的时候会返回一个用户设定的缺省值。

#### 内容返回

在进行查询的时候，我们会有大量的json格式的信息需要返回到前端进行处理：

```python
import json
@app.route('/hello', methods=['GET', 'POST'])
def hello():
	data={'message':'hello',
        'status':'ok'}
	return json.dumps(data)
```

#### Session

使用`session`对象，允许你在不同请求之间存储信息。这个对象相当于用密钥签名加密的 cookie ，即用户可以查看你的 cookie ，但是如果没有密钥就无法修改它。

使用`session`之前必须设置一个密钥：

```python
from flask import Flask, session, redirect, url_for, escape, request

app = Flask(__name__)
app.secret_key = "nQnk2n8moN=GLNmE.wL6PTZD"

@app.route('/')
def index():
    if 'username' in session:
        return 'Logged in as %s' % escape(session['username'])
    return 'You are not logged in'
  
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('index'))
      
@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))
```

上面的代码使用Session实现登入的持久化。

#### 跨域访问

当调用服务端的域名与服务端不一致(前后端分离)的时候会出现跨域问题，可使用Flask-Cors解决以上问题

- 使用这种方法只能返回json格式数据，list、ndarray等都不可以
- 返回的对象必须是字符串、元组、响应实例或WSGI可调用

安装Flask-Cors `pip install Falsk-Cors`

```python
import flask import Flask
from flask_cors import *
app = Flask(__name__)
CORS(app, supports_credentials=True))
```



### Reference

- [Welcome to *Flask* — *Flask* 1.0.2 documentation](https://www.baidu.com/link?url=b-tGRzO2j4rq_9wdfxaRiJcJwrKFql9-zza8dl83U-vMrDa_uVNrgx3sgp6vsTi3&wd=&eqid=9e7c450500065435000000065d183675)
-  [*Flask*-*CORS* — *Flask*-*Cors* 3.0.7 documentation](https://www.baidu.com/link?url=iejRlqMUTYVeczb7nmFolwXiAGKESWNAP4E8BOzf61G7G2mONg2WyIgXbQijGFie&wd=&eqid=f4cb71df0003ca41000000065d183fdf)