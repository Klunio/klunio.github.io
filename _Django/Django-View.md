---
title:  "View in Django"
categories: note Django
date:   2019-08-13 14:52:40 +0800
collection: Django
---

>URL是Web服务的入口，用户通过浏览器发送过来的任何请求，都是发送到一个指定的URL地址，然后被响应。
>
>在Django项目中编写路由，就是向外暴露我们接收哪些URL的请求，除此之外的任何URL都不被处理，也没有返回。通俗地理解，不恰当的形容，URL路由是你的Web服务对外暴露的API。
>
>Django奉行DRY主义，提倡使用简洁、优雅的URL，没有`.php`或`.cgi`这种后缀，更不会单独使用0、2097、1-1-1928、00这样无意义的东西，让你随心所欲设计你的URL，不受框架束缚。



## 一、概述

URL路由在Django项目中的体现就是`urls.py`文件，这个文件可以有很多个，但绝对不会在同一目录下。实际上Django提倡项目有个根`urls.py`，各app下分别有自己的一个`urls.py`，既集中又分治，是一种解耦的模式。

随便新建一个Django项目，默认会自动为我们创建一个`/project_name/urls.py`文件，并且自动包含下面的内容，这就是项目的根URL：



## 二、Django 如何处理请求

当用户请求一个页面时，Django根据下面的逻辑执行操作：

1. **决定要使用的根URLconf模块。**通常，这是`ROOT_URLCONF`设置的值，但是如果传入的HttpRequest对象具有urlconf属性（由中间件设置），则其值将被用于代替`ROOT_URLCONF`设置。通俗的讲，就是你可以自定义项目入口url是哪个文件！
2. **加载该模块并寻找可用的urlpatterns。** 它是`django.urls.path()`或者`django.urls.re_path()`实例的一个列表。
3. **依次匹配每个URL模式，在与请求的URL相匹配的第一个模式停下来**。也就是说，url匹配是从上往下的短路操作，所以url在列表中的位置非常关键。
4. 导入并调用匹配行中给定的视图，该视图是一个简单的Python函数（被称为视图函数）,或基于类的视图。 视图将获得如下参数:
   1. 一个HttpRequest 实例。
   2. 如果匹配的表达式返回了未命名的组，那么匹配的内容将作为位置参数提供给视图。
   3. 关键字参数由表达式匹配的命名组组成，但是可以被`django.urls.path()`的可选参数kwargs覆盖。
5. 如果没有匹配到任何表达式，或者过程中抛出异常，将调用一个适当的错误处理视图。



## 三、简单示例

先看一个例子：

```pytho
from django.urls import path

from . import views

urlpatterns = [
    path('articles/2003/', views.special_case_2003),
    path('articles/<int:year>/', views.year_archive),
    path('articles/<int:year>/<int:month>/', views.month_archive),
    path('articles/<int:year>/<int:month>/<slug:slug>/', views.article_detail),
]
```

注意：

1. 要捕获一段url中的值，需要使用尖括号，而不是之前的圆括号；
2. 可以转换捕获到的值为指定类型，比如例子中的int。默认情况下，捕获到的结果保存为字符串类型，不包含`/`这个特殊字符；
3. 匹配模式的最开头不需要添加`/`，因为默认情况下，每个url都带一个最前面的`/`，既然大家都有的部分，就不用浪费时间特别写一个了。

匹配例子：

- /articles/2005/03/ 将匹配第三条，并调用views.month_archive(request, year=2005, month=3)；
- /articles/2003/匹配第一条，并调用views.special_case_2003(request)；
- /articles/2003将一条都匹配不上，因为它最后少了一个斜杠，而列表中的所有模式中都以斜杠结尾；
- /articles/2003/03/building-a-django-site/ 将匹配最后一个，并调用views.article_detail(request, year=2003, month=3, slug="building-a-django-site"

每当urls.py文件被第一次加载的时候，urlpatterns里的表达式们都将被预先编译，这会大大提高系统处理路由的速度。

## 四、path转换器

默认情况下，Django内置下面的路径转换器：

- `str`：匹配任何非空字符串，但不含斜杠`/`，如果你没有专门指定转换器，那么这个是默认使用的；
- `int`：匹配0和正整数，返回一个int类型
- `slug`：可理解为注释、后缀、附属等概念，是url拖在最后的一部分解释性字符。该转换器匹配任何ASCII字符以及连接符和下划线，比如`building-your-1st-django-site`；
- `uuid`：匹配一个uuid格式的对象。为了防止冲突，规定必须使用破折号，所有字母必须小写，例如`075194d3-6885-417e-a8a8-6c931e272f00`。返回一个UUID对象；
- `path`：匹配任何非空字符串，重点是可以包含路径分隔符’/‘。这个转换器可以帮助你匹配整个url而不是一段一段的url字符串。**要区分path转换器和path()方法**。



## 五、路由转发

通常，我们会在每个app里，各自创建一个urls.py路由模块，然后从根路由出发，将app所属的url请求，全部转发到相应的urls.py模块中。

例如，下面是Django网站本身的URLconf节选。 它包含许多其它URLconf：

```python
from django.urls import include, path

urlpatterns = [
    # ... 省略...
    path('community/', include('aggregator.urls')),
    path('contact/', include('contact.urls')),
    # ... 省略 ...
]
```

路由转发使用的是include()方法，需要提前导入，它的参数是转发目的地路径的字符串，路径以圆点分割。

每当Django 遇到`include()`时，它会去掉URL中匹配的部分并将剩下的字符串发送给include的URLconf做进一步处理，也就是转发到二级路由去。

另外一种转发其它URL模式的方式是使用一个path()实例的列表。 例如，下面的URLconf：

```python
from django.urls import include, path

from apps.main import views as main_views
from credit import views as credit_views

extra_patterns = [
    path('reports/', credit_views.report),
    path('reports/<int:id>/', credit_views.report),
    path('charge/', credit_views.charge),
]

urlpatterns = [
    path('', main_views.homepage),
    path('help/', include('apps.help.urls')),
    path('credit/', include(extra_patterns)),
]
```

在此示例中，`/credit/reports/`URL将由`credit_views.report()`视图处理。这种做法，相当于把二级路由模块内的代码写到根路由模块里一起了，不是很推荐。

再看下面的URLconf：

```python
from django.urls import path
from . import views

urlpatterns = [
    path('<page_slug>-<page_id>/history/', views.history),
    path('<page_slug>-<page_id>/edit/', views.edit),
    path('<page_slug>-<page_id>/discuss/', views.discuss),
    path('<page_slug>-<page_id>/permissions/', views.permissions),
]
```

上面的路由写得不好，我们可以改进它，只需要声明共同的路径前缀一次，并将后面的部分分组转发：

```python
from django.urls import include, path
from . import views

urlpatterns = [
    path('<page_slug>-<page_id>/', include([
        path('history/', views.history),
        path('edit/', views.edit),
        path('discuss/', views.discuss),
        path('permissions/', views.permissions),
    ])),
]
```

这样就优雅多了，也清爽多了，但前提是你要理解这种做法。



## 六、传递参数

目的地URLconf会收到来自父URLconf捕获的所有参数，看下面的例子：

```python
# In settings/urls/main.py
from django.urls import include, path

urlpatterns = [
    path('<username>/blog/', include('foo.urls.blog')),
]

# In foo/urls/blog.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.blog.index),
    path('archive/', views.blog.archive),
]
```

在上面的例子中，捕获的"username"变量将被传递给include()指向的URLconf，再进一步传递给对应的视图。



URLconfs具有一个钩子（hook），允许你传递一个Python字典作为额外的关键字参数给视图函数，像下面这样：

```python
from django.urls import path
from . import views

urlpatterns = [
    path('blog/<int:year>/', views.year_archive, {'foo': 'bar'}),
]
```

在上面的例子中，对于`/blog/2005/`请求，Django将调`用views.year_archive(request, year='2005', foo='bar')`。理论上，你可以在这个字典里传递任何你想要的传递的东西。但是要注意，URL模式捕获的命名关键字参数和在字典中传递的额外参数有可能具有相同的名称，这会发生冲突，要避免。



## 七、Django内置的快捷方法

Django在`django.shortcuts`模块中，为我们提供了很多快捷方便的类和方法，它们都很重要，使用频率很高。

### render

render(request, template_name, context=None, content_type=None, status=None, using=None)[source]

结合一个给定的模板和一个给定的上下文字典，返回一个渲染后的HttpResponse对象。

**必需参数：**

- **request**：视图函数处理的当前请求，封装了请求头的所有数据，其实就是视图参数request。
- **template_name**：要使用的模板的完整名称或者模板名称的列表。如果是一个列表，将使用其中能够查找到的第一个模板。

**可选参数：**

- **context**：添加到模板上下文的一个数据字典。默认是一个空字典。可以将认可需要提供给模板的数据以字典的格式添加进去。这里有个小技巧，使用Python内置的locals()方法，可以方便的将函数作用于内的所有变量一次性添加。
- **content_type**：用于生成的文档的MIME类型。 默认为`DEFAULT_CONTENT_TYPE`设置的值。
- **status**：响应的状态代码。 默认为200。
- **using**：用于加载模板使用的模板引擎的NAME。

**范例：**

下面的例子将渲染模板`myapp/index.html`，MIME类型为`application/xhtml+xml`：

```python
from django.shortcuts import render

def my_view(request):
    # View code here...
    return render(request, 'myapp/index.html', {
        'foo': 'bar',
    }, content_type='application/xhtml+xml')
```

这个示例等同于：

```python
from django.http import HttpResponse
from django.template import loader

def my_view(request):
    # View code here...
    t = loader.get_template('myapp/index.html')
    c = {'foo': 'bar'}
    return HttpResponse(t.render(c, request), content_type='application/xhtml+xml')
```

### render_to_response()

render_to_response(template_name, context=None, content_type=None, status=None, using=None)[source]

此功能在引入render()之前进行，不推荐，以后可能会被弃用。

### redirect()

redirect(to, permanent=False, *args,* *kwargs)[source]

根据传递进来的url参数，返回HttpResponseRedirect。

参数to可以是：

- 一个模型：将调用模型的`get_absolute_url()`函数，反向解析出目的url；
- 视图名称：可能带有参数：reverse()将用于反向解析url；
- 一个绝对的或相对的URL：将原封不动的作为重定向的目标位置。

默认情况下是临时重定向，如果设置`permanent=True`将永久重定向。

**范例：**

1.调用对象的`get_absolute_url()`方法来重定向URL：

```python
from django.shortcuts import redirect

def my_view(request):
    ...
    object = MyModel.objects.get(...)
    return redirect(object)
```

2.传递视图名，使用reverse()方法反向解析url：

```python
def my_view(request):
    ...
    return redirect('some-view-name', foo='bar')
```

1. 重定向到硬编码的URL：

```python
def my_view(request):
    ...
    return redirect('/some/url/')
```

1. 重定向到一个完整的URL：

```python
def my_view(request):
    ...
    return redirect('https://example.com/')
```

所有上述形式都接受permanent参数；如果设置为True，将返回永久重定向：

```python
def my_view(request):
    ...
    object = MyModel.objects.get(...)
    return redirect(object, permanent=True)
```

### get_object_or_404()

get_object_or_404(klass, *args,* *kwargs)[source]

这个方法，非常有用，请一定熟记。常用于查询某个对象，找到了则进行下一步处理，如果未找到则给用户返回404页面。

在后台，Django其实是调用了模型管理器的get()方法，只会返回一个对象。不同的是，如果get()发生异常，会引发Http404异常，从而返回404页面，而不是模型的DoesNotExist异常。

**必需参数**：

- **class**：要获取的对象的Model类名或者Queryset等；
- `**kwargs`:查询的参数，格式应该可以被get()接受。

**范例：**

1.从MyModel中使用主键1来获取对象：

```python
from django.shortcuts import get_object_or_404

def my_view(request):
    my_object = get_object_or_404(MyModel, pk=1)
```

这个示例等同于：

```python
from django.http import Http404

def my_view(request):
    try:
        my_object = MyModel.objects.get(pk=1)
    except MyModel.DoesNotExist:
        raise Http404("No MyModel matches the given query.")
```

2.除了传递Model名称，还可以传递一个QuerySet实例：

```python
queryset = Book.objects.filter(title__startswith='M')
get_object_or_404(queryset, pk=1)
```

上面的示例不够简洁，因为它等同于：

```python
get_object_or_404(Book, title__startswith='M', pk=1)
```

但是如果你的queryset来自其它地方，它就会很有用了。

3.还可以使用Manager。 如果你自定义了管理器，这将很有用：

```python
get_object_or_404(Book.dahl_objects, title='Matilda')
```

4.还可以使用related managers：

```python
author = Author.objects.get(name='Roald Dahl')
get_object_or_404(author.book_set, title='Matilda')
```

与get()一样，如果找到多个对象将引发一个MultipleObjectsReturned异常。

### 5. get_list_or_404()

get_list_or_404(klass, *args,* *kwargs)[source]

这其实就是`get_object_or_404`多值获取版本。

在后台，返回一个给定模型管理器上filter()的结果，并将结果映射为一个列表，如果结果为空则弹出Http404异常。

**必需参数**：

- **klass**：获取该列表的一个Model、Manager或QuerySet实例。
- `**kwargs`：查询的参数，格式应该可以被filter()接受。





