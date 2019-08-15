---
title:  "REST framework — Serializer & ViewSets"
categories: note Django
date:   2019-08-14 09:41:40 +0800
collection: Django

---



## Serializer

> refer : https://q1mi.github.io/Django-REST-framework-documentation/tutorial/1-serialization_zh/#model

开发我们的Web API的第一件事是为我们的Web API提供一种将代码片段实例序列化和反序列化为诸如`json`之类的表示形式的方式。我们可以通过声明与Django forms非常相似的序列化器（serializers）来实现。 在`snippets`的目录下创建一个名为`serializers.py`文件，并添加以下内容。

```python
from rest_framework import serializers
from snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES


class SnippetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    code = serializers.CharField(style={'base_template': 'textarea.html'})
    linenos = serializers.BooleanField(required=False)
    language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
    style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')

    def create(self, validated_data):
        """
        根据提供的验证过的数据创建并返回一个新的`Snippet`实例。
        """
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        根据提供的验证过的数据更新和返回一个已经存在的`Snippet`实例。
        """
        instance.title = validated_data.get('title', instance.title)
        instance.code = validated_data.get('code', instance.code)
        instance.linenos = validated_data.get('linenos', instance.linenos)
        instance.language = validated_data.get('language', instance.language)
        instance.style = validated_data.get('style', instance.style)
        instance.save()
        return instance
```

序列化器类的第一部分定义了序列化/反序列化的字段。`create()`和`update()`方法定义了在调用`serializer.save()`时如何创建和修改完整的实例。

序列化器类与Django `Form`类非常相似，并在各种字段中包含类似的验证标志，例如`required`，`max_length`和`default`。

字段标志还可以控制serializer在某些情况下如何显示，比如渲染HTML的时候。上面的`{'base_template': 'textarea.html'}`标志等同于在Django `Form`类中使用`widget=widgets.Textarea`。这对于控制如何显示可浏览器浏览的API特别有用，我们将在本教程的后面看到。

我们实际上也可以通过使用`ModelSerializer`类来节省时间，就像我们后面会用到的那样。但是现在我们还继续使用我们明确定义的serializer。

### 使用序列化类

在我们进一步了解之前，我们先来熟悉使用我们新的Serializer类。输入下面的命令进入Django shell。

```shell
python manage.py shell
```

好的，像下面一样导入几个模块，然后开始创建一些代码片段来处理。

```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

snippet = Snippet(code='foo = "bar"\n')
snippet.save()

snippet = Snippet(code='print "hello, world"\n')
snippet.save()
```

我们现在已经有几个片段实例了，让我们看一下将其中一个实例序列化。

```python
serializer = SnippetSerializer(snippet)
serializer.data
# {'id': 2, 'title': u'', 'code': u'print "hello, world"\n', 'linenos': False, 'language': u'python', 'style': u'friendly'}
```

此时，我们将模型实例转换为Python原生数据类型。要完成序列化过程，我们将数据转换成`json`。

```python
content = JSONRenderer().render(serializer.data)
content
# '{"id": 2, "title": "", "code": "print \\"hello, world\\"\\n", "linenos": false, "language": "python", "style": "friendly"}'
```

反序列化是类似的。首先我们将一个流（stream）解析为Python原生数据类型...

```python
from django.utils.six import BytesIO

stream = BytesIO(content)
data = JSONParser().parse(stream)
```

...然后我们要将Python原生数据类型恢复成正常的对象实例。

```python
serializer = SnippetSerializer(data=data)
serializer.is_valid()
# True
serializer.validated_data
# OrderedDict([('title', ''), ('code', 'print "hello, world"\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')])
serializer.save()
# <Snippet: Snippet object>
```

可以看到API和表单(forms)是多么相似。当我们开始使用我们的序列化类编写视图的时候，相似性会变得更加明显。

我们也可以序列化查询结果集（querysets）而不是模型实例。我们只需要为serializer添加一个`many=True`标志。

```python
serializer = SnippetSerializer(Snippet.objects.all(), many=True)
serializer.data
# [OrderedDict([('id', 1), ('title', u''), ('code', u'foo = "bar"\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')]), OrderedDict([('id', 2), ('title', u''), ('code', u'print "hello, world"\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')]), OrderedDict([('id', 3), ('title', u''), ('code', u'print "hello, world"'), ('linenos', False), ('language', 'python'), ('style', 'friendly')])]
```

### ✨✨使用ModelSerializers

我们的`SnippetSerializer`类中重复了很多包含在`Snippet`模型类（model）中的信息。如果能保证我们的代码整洁，那就更好了。

就像Django提供了`Form`类和`ModelForm`类一样，REST framework包括`Serializer`类和`ModelSerializer`类。

我们来看看使用`ModelSerializer`类重构我们的序列化类。再次打开`snippets/serializers.py`文件，并将`SnippetSerializer`类替换为以下内容。

```python
class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'linenos', 'language', 'style')
```

序列一个非常棒的属性就是可以通过打印序列化器类实例的结构(representation)查看它的所有字段。

```python
from snippets.serializers import SnippetSerializer
serializer = SnippetSerializer()
print(repr(serializer))
# SnippetSerializer():
#    id = IntegerField(label='ID', read_only=True)
#    title = CharField(allow_blank=True, max_length=100, required=False)
#    code = CharField(style={'base_template': 'textarea.html'})
#    linenos = BooleanField(required=False)
#    language = ChoiceField(choices=[('Clipper', 'FoxPro'), ('Cucumber', 'Gherkin'), ('RobotFramework', 'RobotFramework'), ('abap', 'ABAP'), ('ada', 'Ada')...
#    style = ChoiceField(choices=[('autumn', 'autumn'), ('borland', 'borland'), ('bw', 'bw'), ('colorful', 'colorful')...
```

重要的是要记住，`ModelSerializer`类并不会做任何特别神奇的事情，它们只是创建序列化器类的快捷方式：

- 一组自动确定的字段。
- 默认简单实现的`create()`和`update()`方法。



## Viewsets

>refer : https://q1mi.github.io/Django-REST-framework-documentation/api-guide/viewsets_zh/

Django REST framework允许你将一组相关视图的逻辑组合在单个类（称为 `ViewSet`）中。 在其他框架中，你也可以找到概念上类似于 'Resources' 或 'Controllers'的类似实现。

`ViewSet` 只是**一种基于类的视图，它不提供任何方法处理程序**（如 `.get()`或`.post()`）,而是提供诸如 `.list()` 和 `.create()` 之类的操作。

`ViewSet` 的方法处理程序仅使用 `.as_view()` 方法绑定到完成视图的相应操作。

通常不是在 urlconf 中的视图集中显示注册视图，而是要使用路由类注册视图集，该类会自动为你确定 urlconf。

### Example

让我们定义一个简单的视图集，可以用来列出或检索系统中的所有用户。

```python
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from myapps.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.response import Response

class UserViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
```

如果我们需要，我们可以将这个viewset绑定到两个单独的视图，想这样：

```python
user_list = UserViewSet.as_view({'get': 'list'})
user_detail = UserViewSet.as_view({'get': 'retrieve'})
```

通常我们不会这么做，我们会用一个router来注册我们的viewset，让urlconf自动生成。

```python
from myapp.views import UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet)
urlpatterns = router.urls
```

不需要编写自己的视图集，你通常会想要使用提供默认行为的现有基类。例如：

```python
class UserViewSet(viewsets.ModelViewSet):
    """
    用于查看和编辑用户实例的视图集。
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
```

与使用 `View` 类相比，使用 `ViewSet` 类有两个主要优点。

- 重复的逻辑可以组合成一个类。在上面的例子中，我们只需要指定一次 `queryset`，它将在多个视图中使用。
- 通过使用 routers, 哦们不再需要自己处理URLconf。

这两者都有一个权衡。使用常规的 views 和 URL confs 更明确也能够为你提供更多的控制。ViewSets有助于快速启动和运行，或者当你有大型的API，并且希望在整个过程中执行一致的 URL 配置。

### ViewSet

`ViewSet` 继承自 `APIView`。你可以使用任何标准属性，如 `permission_classes`, `authentication_classes` 以便控制视图集上的 API 策略。

`ViewSet` 类不提供任何操作的实现。为了使用 `ViewSet` 类，你将重写该类并显式地定义动作实现。

### GenericViewSets

`GenericViewSet` 类继承自 `GenericAPIView`，并提供了 `get_object`， `get_queryset` 方法和其他通用视图基本行为的默认配置，但默认情况不包括任何操作。

In order to use a `GenericViewSet` class you'll override the class and either mixin the required mixin classes, or define the action implementations explicitly.

### ModelViewSet

The `ModelViewSet` class inherits from `GenericAPIView` and includes implementations for various actions, by mixing in the behavior of the various mixin classes.

The actions provided by the `ModelViewSet` class are `.list()`, `.retrieve()`,`.create()`, `.update()`, `.partial_update()`, and `.destroy()`.

#### [Example](https://q1mi.github.io/Django-REST-framework-documentation/api-guide/viewsets_zh/#example_1)

Because `ModelViewSet` extends `GenericAPIView`, you'll normally need to provide at least the `queryset` and `serializer_class` attributes. For example:

```python
class AccountViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAccountAdminOrReadOnly]
```

Note that you can use any of the standard attributes or method overrides provided by `GenericAPIView`. For example, to use a `ViewSet` that dynamically determines the queryset it should operate on, you might do something like this:

```python
class AccountViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing the accounts
    associated with the user.
    """
    serializer_class = AccountSerializer
    permission_classes = [IsAccountAdminOrReadOnly]

    def get_queryset(self):
        return self.request.user.accounts.all()
```

Note however that upon removal of the `queryset` property from your `ViewSet`, any associated [router](https://q1mi.github.io/Django-REST-framework-documentation/api-guide/viewsets_zh/routers.md) will be unable to derive the base_name of your Model automatically, and so you will have to specify the `base_name` kwarg as part of your [router registration](https://q1mi.github.io/Django-REST-framework-documentation/api-guide/viewsets_zh/routers.md).

Also note that although this class provides the complete set of create/list/retrieve/update/destroy actions by default, you can restrict the available operations by using the standard permission classes.



