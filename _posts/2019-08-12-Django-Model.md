---
layout: single
author_profile: false
title:  "MODEL IN DJANGO"
categories: note Django
collection: Django
---

##Model in Django

>[refer](http://www.liujiangblog.com/course/django/100)

Django中所有的模型都必须继承`django.db.models.Model`模型，不管是直接继承也好，还是间接继承也罢。

你唯一需要决定的是，父模型是否是一个独立自主的，同样在数据库中创建数据表的模型，还是一个只用来保存子模型共有内容，并不实际创建数据表的抽象模型。

Django有三种继承的方式：

- 抽象基类：被用来继承的模型被称为`Abstract base classes`，将子类共同的数据抽离出来，供子类继承重用，它不会创建实际的数据表；
- 多表继承：`Multi-table inheritance`，每一个模型都有自己的数据库表；
- 代理模型：如果你只想修改模型的Python层面的行为，并不想改动模型的字段，可以使用代理模型。





### 一、抽象基类

只需要在模型的Meta类里添加`abstract=True`元数据项，就可以将一个模型转换为抽象基类。**Django不会为这种类创建实际的数据库表**，它们也没有管理器，不能被实例化也无法直接保存，**它们就是用来被继承的**。抽象基类完全就是用来保存子模型们共有的内容部分，达到重用的目的。当它们被继承时，它们的字段会全部复制到子模型中。看下面的例子：

```python
from django.db import models

class CommonInfo(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()

    class Meta:
        abstract = True

class Student(CommonInfo):
    home_group = models.CharField(max_length=5)
```

Student模型将拥有name，age，home_group三个字段，并且CommonInfo模型不能当做一个正常的模型使用。



#### 抽象基类的Meta数据：

如果子类没有声明自己的Meta类，那么它将继承抽象基类的Meta类。下面的例子则扩展了基类的Meta：

```python
from django.db import models

class CommonInfo(models.Model):
    # ...
    class Meta:
        abstract = True
        ordering = ['name']

class Student(CommonInfo):
    # ...
    class Meta(CommonInfo.Meta):
        db_table = 'student_info'
```

这里有几点要特别说明：

- 抽象基类中有的元数据，子模型没有的话，直接继承；
- **抽象基类中有的元数据，子模型也有的话，直接覆盖；**
- 子模型可以额外添加元数据；
- 抽象基类中的`abstract=True`这个元数据不会被继承。也就是说如果想让一个抽象基类的子模型，同样成为一个抽象基类，那你必须显式的在该子模型的Meta中同样声明一个`abstract = True`；
- 有一些元数据对抽象基类无效，比如`db_table`，首先是抽象基类本身不会创建数据表，其次它的所有子类也不会按照这个元数据来设置表名。



#### 警惕related_name和related_query_name参数

如果在你的抽象基类中存在ForeignKey或者ManyToManyField字段，并且使用了`related_name`或者`related_query_name`参数，那么一定要小心了。因为按照默认规则，每一个子类都将拥有同样的字段，这显然会导致错误。为了解决这个问题，当你在抽象基类中使用`related_name`或者`related_query_name`参数时，**它们两者的值中应该包含`%(app_label)s`和`%(class)s`部分：**

- `%(class)s`用字段所属子类的小写名替换
- `%(app_label)s`用子类所属app的小写名替换

例如，对于`common/models.py`模块：

```python
from django.db import models

class Base(models.Model):
    m2m = models.ManyToManyField(
    OtherModel,
    related_name="%(app_label)s_%(class)s_related",
    related_query_name="%(app_label)s_%(class)ss",
    )

    class Meta:
        abstract = True

class ChildA(Base):
    pass

class ChildB(Base):
    pass
```

对于另外一个应用中的`rare/models.py`:

```python
from common.models import Base

class ChildB(Base):
    pass
```

对于上面的继承关系：

- `common.ChildA.m2m`字段的`reverse name`（反向关系名）应该是`common_childa_related`；`reverse query name`(反向查询名)应该是`common_childas`。
- `common.ChildB.m2m`字段的反向关系名应该是`common_childb_related`；反向查询名应该是`common_childbs`。
- `rare.ChildB.m2m`字段的反向关系名应该是`rare_childb_related`；反向查询名应该是`rare_childbs`。

当然，如果你不设置`related_name`或者`related_query_name`参数，这些问题就不存在了。



### 二、多表继承

这种继承方式下，**父类和子类都是独立自主、功能完整、可正常使用的模型**，都有自己的数据库表，内部隐含了一个一对一的关系。例如：

```python
from django.db import models

class Place(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=80)

class Restaurant(Place):
    serves_hot_dogs = models.BooleanField(default=False)
    serves_pizza = models.BooleanField(default=False)
```

**Restaurant将包含Place的所有字段**，并且各有各的数据库表和字段，比如：

```python
>>> Place.objects.filter(name="Bob's Cafe")
>>> Restaurant.objects.filter(name="Bob's Cafe")
```

如果一个Place对象同时也是一个Restaurant对象，你可以使用小写的子类名，在父类中访问它，例如：

```python
>>> p = Place.objects.get(id=12)
# 如果p也是一个Restaurant对象，那么下面的调用可以获得该Restaurant对象。
>>> p.restaurant
<Restaurant: ...>
```

其机制内部隐含的OneToOne字段，形同下面所示：

```python
place_ptr = models.OneToOneField(
    Place, on_delete=models.CASCADE,
    parent_link=True,
)
```

可以通过创建一个OneToOneField字段并设置 `parent_link=True`，自定义这个一对一字段。



#####个人理解：

**假设B继承于A：**

- A和B的表是独立的
- 因为B继承于A，因此在创建B的时候也会同时创建A
- A和B之间是一一对应的（或者A独立）
- 由B生成的A是可以用过A.b找到这个原始的B，但是反过来B是找不到对应的A的。



### 三、代理模型

使用多表继承时，父类的每个子类都会创建一张新数据表，通常情况下，这是我们想要的操作，因为子类需要一个空间来存储不包含在父类中的数据。**但有时，你可能只想更改模型在Python层面的行为，比如更改默认的manager管理器，或者添加一个新方法。**

代理模型就是为此而生的。你可以创建、删除、更新代理模型的实例，并且所有的数据都可以像使用原始模型（非代理类模型）一样被保存。**不同之处在于你可以在代理模型中改变默认的排序方式和默认的manager管理器等等**，而不会对原始模型产生影响。

##### **声明一个代理模型只需要将Meta中proxy的值设为True。**



**一些约束：**

- 代理模型必须继承自一个非抽象的基类，并且不能同时继承多个非抽象基类；
- 代理模型可以同时继承任意多个抽象基类，前提是这些抽象基类没有定义任何模型字段。
- 代理模型可以同时继承多个别的代理模型，前提是这些代理模型继承同一个非抽象基类。（早期Django版本不支持这一条）



**代理模型的管理器**

如不指定，则继承父类的管理器。如果你自己定义了管理器，那它就会成为默认管理器，但是父类的管理器依然有效。如下例子：

```python
from django.db import models

class NewManager(models.Manager):
    # ...
    pass

class MyPerson(Person):
    objects = NewManager()

    class Meta:
        proxy = True
```

如果你想要向代理中添加新的管理器，而不是替换现有的默认管理器，你可以创建一个含有新的管理器的基类，并在继承时把他放在主基类的后面：

```python
# Create an abstract class for the new manager.
class ExtraManagers(models.Model):
    secondary = NewManager()

    class Meta:
        abstract = True

class MyPerson(Person, ExtraManagers):
    class Meta:
        proxy = True
```





### 四、文件结构组织

在我们使用`python manage.py startapp xxx`命令创建新的应用时，Django会自动帮我们建立一个应用的基本文件组织结构，其中就包括一个`models.py`文件。通常，我们把当前应用的模型都编写在这个文件里，但是如果你的模型很多，那么将单独的`models.py`文件分割成一些独立的文件是个更好的做法。

首先，我们需要在应用中新建一个叫做`models`的包，再在包下创建一个`__init__.py`文件，这样才能确立包的身份。然后将`models.py`文件中的模型分割到一些`.py`文件中，比如`organic.py`和`synthetic.py`，然后删除`models.py`文件。最后在`__init__.py`文件中导入所有的模型。如下例所示：

```python
#  myapp/models/__init__.py

from .organic import Person
from .synthetic import Robot
```

要显式明确地导入每一个模型，而不要使用`from .models import *`的方式，这样不会混淆命名空间，让代码更可读，更容易被分析工具使用。