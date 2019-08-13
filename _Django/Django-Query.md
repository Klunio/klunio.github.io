---
title:  "Query in Django"
categories: note Django
date:   2019-08-13 14:55:40 +0800
collection: Django
---

>refer : http://www.liujiangblog.com/course/django/129

**查询操作是Django的ORM框架中最重要的内容之一。Django自动为所有的模型提供了一套完善、方便、高效的API**

----

以如下的博客应用为模型：

```python
from django.db import models

class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def __str__(self):              # __unicode__ on Python 2
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()

    def __str__(self):              # __unicode__ on Python 2
        return self.name

class Entry(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    headline = models.CharField(max_length=255)
    body_text = models.TextField()
    pub_date = models.DateField()
    mod_date = models.DateField()
    authors = models.ManyToManyField(Author)
    n_comments = models.IntegerField()
    n_pingbacks = models.IntegerField()
    rating = models.IntegerField()

    def __str__(self):              # __unicode__ on Python 2
        return self.headline
```



### 一、创建对象与保存

#### 创建对象

```python
>>> from blog.models import Blog
>>> b = Blog(name='Beatles Blog', tagline='All the latest Beatles news.')
>>> b.save()
```

运行`save`之后，后台会运行一条SQL的INSERT语句，`save()`方法没有返回值，它可以接受一些额外的参数.

也可以使用`xxx.objects.create()`代替上面的操作



#### 外键和多字段

保存一个外键字段和保存普通字段一样，只要正确赋值然后调用`save`方法进行保存就好

对于多字段的保存稍微有点区别，需要调用一个`add()`方法，而不是直接给属性赋值，**但它不需要调用`save`方法**

```python
>>> from blog.models import Author
>>> joe = Author.objects.create(name="Joe")
>>> entry.authors.add(joe)
```

在一行语句内，可以同时添加多个对象到多对多的字段，如下所示：

```python
>>> john = Author.objects.create(name="John")
>>> paul = Author.objects.create(name="Paul")
>>> george = Author.objects.create(name="George")
>>> ringo = Author.objects.create(name="Ringo")
>>> entry.authors.add(john, paul, george, ringo)
```

如果你指定或添加了错误类型的对象，Django会抛出异常。



### 二、检索对象

想要从数据库内检索对象，你需要基于模型类，通过管理器（Manager）构造一个查询结果集（QuerySet）。

每个QuerySet代表一些数据库对象的集合。它可以包含零个、一个或多个过滤器（filters）。Filters缩小查询结果的范围。在SQL语法中，一个QuerySet相当于一个SELECT语句，而filter则相当于WHERE或者LIMIT一类的子句。

通过模型的Manager获得QuerySet，每个模型至少具有一个Manager，默认情况下，它被称作`objects`，**可以通过模型类直接调用它，但不能通过模型类的实例调用它**，以此实现“表级别”操作和“记录级别”操作的强制分离。如下所示：

```python
>>> Blog.objects
<django.db.models.manager.Manager object at ...>
>>> b = Blog(name='Foo', tagline='Bar')
>>> b.objects
Traceback:
...
AttributeError: "Manager isn't accessible via Blog instances."
```



#### 检索所有对象

```python
all_entries = Entry.objects.all()
```



#### 过滤对象

有两个方法可以用来过滤QuerySet的结果，分别是：

- `filter(**kwargs)`：返回一个根据指定参数查询出来的QuerySet
- `exclude(**kwargs)`：返回除了根据指定参数查询出来结果的QuerySet

其中，`**kwargs`参数的格式必须是Django设置的一些字段格式。

例如：

```python
Entry.objects.filter(pub_date__year=2006)
```

它等同于：

```python
Entry.objects.all().filter(pub_date__year=2006)
```

**链式过滤**

filter和exclude的结果依然是个QuerySet，因此它可以继续被filter和exclude，这就形成了链式过滤：

```python
>>> Entry.objects.filter(
...     headline__startswith='What'
... ).exclude(
...     pub_date__gte=datetime.date.today()
... ).filter(
...     pub_date__gte=datetime(2005, 1, 30)
... )
```

（这里需要注意的是，当在进行跨关系的链式过滤时，结果可能和你想象的不一样，参考下面的跨多值关系查询）

**被过滤的QuerySets都是唯一的**

每一次过滤，你都会获得一个**全新的QuerySet**，它和之前的QuerySet没有任何关系，可以完全独立的被保存，使用和重用。例如：

```python
>>> q1 = Entry.objects.filter(headline__startswith="What")
>>> q2 = q1.exclude(pub_date__gte=datetime.date.today())
>>> q3 = q1.filter(pub_date__gte=datetime.date.today())
```

例子中的q2和q3虽然由q1得来，是q1的子集，但是都是独立自主存在的。同样q1也不会受到q2和q3的影响。

**QuerySets都是懒惰的**

一个创建QuerySets的动作不会立刻导致任何的数据库行为。你可以不断地进行filter动作一整天，Django不会运行任何实际的数据库查询动作，直到QuerySets被提交(evaluated)。

简而言之就是，只有碰到某些特定的操作，Django才会将所有的操作体现到数据库内，否则它们只是保存在内存和Django的层面中。这是一种提高数据库查询效率，减少操作次数的优化设计。看下面的例子：

```
>>> q = Entry.objects.filter(headline__startswith="What")
>>> q = q.filter(pub_date__lte=datetime.date.today())
>>> q = q.exclude(body_text__icontains="food")
>>> print(q)
```

上面的例子，看起来执行了3次数据库访问，实际上只是在print语句时才执行1次访问。通常情况，QuerySets的检索不会立刻执行实际的数据库查询操作，直到出现类似print的请求，也就是所谓的**evaluated**。



#### 检索单一对象

filter方法始终返回的是QuerySets，那怕只有一个对象符合过滤条件，返回的也是包含一个对象的QuerySets，这是一个集合类型对象，你可以简单的理解为Python列表，可迭代可循环可索引。

如果你确定你的检索只会获得一个对象，那么你可以使用Manager的get()方法来直接返回这个对象。

```python
>>> one_entry = Entry.objects.get(pk=1)
```

在get方法中你可以使用任何filter方法中的查询参数，用法也是一模一样。

**注意**：使用get()方法和使用filter()方法然后通过[0]的方式分片，有着不同的地方。看似两者都是获取单一对象。但是，**如果在查询时没有匹配到对象，那么get()方法将抛出DoesNotExist异常**。这个异常是模型类的一个属性，在上面的例子中，如果不存在主键为1的Entry对象，那么Django将抛出`Entry.DoesNotExist`异常。

类似地，**在使用get()方法查询时，如果结果超过1个，则会抛出MultipleObjectsReturned异常**，这个异常也是模型类的一个属性。

**所以：get()方法要慎用！**



#### 使用限制

通常情况，切片操作会返回一个新的QuerySet，并且不会被立刻执行。但是有一个例外，那就是指定步长的时候，查询操作会立刻在数据库内执行，如下：

```python
>>> Entry.objects.all()[:10:2]
```

若要获取单一的对象而不是一个列表（例如，SELECT foo FROM bar LIMIT 1），可以简单地使用索引而不是切片。例如，下面的语句返回数据库中根据标题排序后的第一条Entry：

```python
>>> Entry.objects.order_by('headline')[0]
```

它相当于：

```python
>>> Entry.objects.order_by('headline')[0:1].get()
```

注意：如果没有匹配到对象，那么第一种方法会抛出IndexError异常，而第二种方式会抛出DoesNotExist异常。

也就是说在使用get和切片的时候，要注意查询结果的元素个数。



#### 字段查询

字段查询其实就是filter()、exclude()和get()等方法的关键字参数。 其基本格式是：`field__lookuptype=value`，**注意其中是双下划线**。 例如：

```python
>>> Entry.objects.filter(pub_date__lte='2006-01-01')
#　相当于：
SELECT * FROM blog_entry WHERE pub_date <= '2006-01-01';
```

其中的字段必须是模型中定义的字段之一。但是有一个例外，那就是ForeignKey字段，你可以为其添加一个“_id”后缀（单下划线）。这种情况下键值是外键模型的主键原生值。例如：

```python
>>> Entry.objects.filter(blog_id=4)
```

如果你传递了一个非法的键值，查询函数会抛出TypeError异常。

Django的数据库API支持20多种查询类型，下面介绍一些常用的：



|     look up type      |         usage          |
| :-------------------: | :--------------------: |
|         exact         |        默认类型        |
|        iexact         |      不区分大小写      |
|       contains        |    包含，大小写敏感    |
|       icontains       |   包含，不区分大小写   |
| stratswith,endstiwith |        字面意思        |
| istartswith,iendswith | 字面意思，不区分大小写 |



#### 跨关系查询

Django提供了强大并且直观的方式解决跨越关联的查询，它在后台自动执行包含JOIN的SQL语句。要跨越某个关联，只需使用关联的模型字段名称，并使用双下划线分隔，直至你想要的字段（可以链式跨越，无限跨度）。例如：

```python
# 返回所有Blog的name为'Beatles Blog'的Entry对象
# 一定要注意，返回的是Entry对象，而不是Blog对象。
# objects前面用的是哪个class，返回的就是哪个class的对象。
>>> Entry.objects.filter(blog__name='Beatles Blog')
```

反之亦然，如果要引用一个反向关联，只需要使用模型的小写名!

```python
# 获取所有的Blog对象，前提是它所关联的Entry的headline包含'Lennon'
>>> Blog.objects.filter(entry__headline__contains='Lennon')
```

如果你在多级关联中进行过滤而且其中某个中间模型没有满足过滤条件的值，Django将把它当做一个空的（所有的值都为NULL）但是合法的对象，不会抛出任何异常或错误。例如，在下面的过滤器中：

```python
Blog.objects.filter(entry__authors__name='Lennon')
```

如果Entry中没有关联任何的author，那么它将当作其没有name，而不会因为没有author 引发一个错误。通常，这是比较符合逻辑的处理方式。唯一可能让你困惑的是当你使用`isnull`的时候：

```python
Blog.objects.filter(entry__authors__name__isnull=True)
```

这将返回Blog对象，它关联的entry对象的author字段的name字段为空，以及Entry对象的author字段为空。如果你不需要后者，你可以这样写：

```python
Blog.objects.filter(entry__authors__isnull=False,entry__autho
```

#### **跨越多值的关系查询**

最基本的filter和exclude的关键字参数只有一个，这种情况很好理解。但是当关键字参数有多个，且是跨越外键或者多对多的情况下，那么就比较复杂，让人迷惑了。我们看下面的例子：

```python
Blog.objects.filter(entry__headline__contains='Lennon', entry__pub_date__year=2008)
```

这是一个跨外键、两个过滤参数的查询。此时我们理解两个参数之间属于-与“and”的关系，也就是说，过滤出来的BLog对象对应的entry对象必须同时满足上面两个条件。这点很好理解。也就是说**上面要求至少有一个entry同时满足两个条件**。

但是，看下面的用法：

```python
Blog.objects.filter(entry__headline__contains='Lennon').filter(entry__pub_date__year=2008)
```

把两个参数拆开，放在两个filter调用里面，按照我们前面说过的链式过滤，这个结果应该和上面的例子一样。可实际上，它不一样，Django在这种情况下，将两个filter之间的关系设计为-或“or”，这真是让人头疼。

多对多关系下的多值查询和外键foreignkey的情况一样。

但是，更头疼的来了，exclude的策略设计的又和filter不一样！

```python
Blog.objects.exclude(entry__headline__contains='Lennon',entry__pub_date__year=2008,)
```

这会排除headline中包含“Lennon”的Entry和在2008年发布的Entry，中间是一个-和“or”的关系！

那么要排除同时满足上面两个条件的对象，该怎么办呢？看下面：

```python
Blog.objects.exclude(
entry=Entry.objects.filter(
    headline__contains='Lennon',
    pub_date__year=2008,
),
)
```

（有没有很坑爹的感觉？所以，建议在碰到跨关系的多值查询时，尽量使用Q查询）



#### 快捷查询 pk

pk就是`primary key`的缩写。通常情况下，一个模型的主键为“id”，所以下面三个语句的效果一样：

```python
>>> Blog.objects.get(id__exact=14) # Explicit form
>>> Blog.objects.get(id=14) # __exact is implied
>>> Blog.objects.get(pk=14) # pk implies id__exact
```



### 三、使用Q对象进行复杂查询

普通filter函数里的条件都是“and”逻辑，如果你想实现“or”逻辑怎么办？用Q查询！

Q来自`django.db.models.Q`，用于封装关键字参数的集合，可以作为关键字参数用于filter、exclude和get等函数。 例如：

```python
from django.db.models import Q
Q(question__startswith='What')
```

可以使用“&”或者“|”或“~”来组合Q对象，分别表示与或非逻辑。它将返回一个新的Q对象。

```python
Q(question__startswith='Who')|Q(question__startswith='What')
# 这相当于：
WHERE question LIKE 'Who%' OR question LIKE 'What%'
```

更多的例子：

```python
Q(question__startswith='Who') | ~Q(pub_date__year=2005)
```

你也可以这么使用，默认情况下，以逗号分隔的都表示AND关系：

```python
Poll.objects.get(
Q(question__startswith='Who'),
Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6))
)
# 它相当于
# SELECT * from polls WHERE question LIKE 'Who%'
AND (pub_date = '2005-05-02' OR pub_date = '2005-05-06')
```

当关键字参数和Q对象组合使用时，Q对象必须放在前面，如下例子：

```python
Poll.objects.get(
Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)),question__startswith='Who',)
```

如果关键字参数放在Q对象的前面，则会报错。



### 四、比较对象

要比较两个模型实例，只需要使用python提供的双等号比较符就可以了。**在后台，其实比较的是两个实例的主键的值**。下面两种方法是等同的：

```pyton
>>> some_entry == other_entry
>>> some_entry.id == other_entry.id
```

如果模型的主键不叫做“id”也没关系，后台总是会使用正确的主键名字进行比较，例如，如果一个模型的主键的名字是“name”，那么下面是相等的：

```python
>>> some_obj == other_obj
>>> some_obj.name == other_obj.name
```



### 五、删除对象

删除对象使用的是对象的`delete()`方法。该方法将返回被删除对象的总数量和一个字典，字典包含了每种被删除对象的类型和该类型的数量。如下所示：

```python
>>> e.delete()
(1, {'weblog.Entry': 1})
```

也可以批量删除。每个QuerySet都有一个delete()方法，它能删除该QuerySet的所有成员。例如：

```python
>>> Entry.objects.filter(pub_date__year=2005).delete()
(5, {'webapp.Entry': 5})
```

需要注意的是，有可能不是每一个对象的delete方法都被执行。如果你改写了delete方法，为了确保对象被删除，你必须手动迭代QuerySet进行逐一删除操作。

当Django删除一个对象时，它默认使用SQL的ON DELETE CASCADE约束，也就是说，任何有外键指向要删除对象的对象将一起被删除。例如：

```python
b = Blog.objects.get(pk=1)
# 下面的动作将删除该条Blog和所有的它关联的Entry对象
b.delete()
```

这种级联的行为可以通过的ForeignKey的`on_delete`参数自定义。

注意，`delete()`是唯一没有在管理器上暴露出来的方法。这是刻意设计的一个安全机制，用来防止你意外地请求类似`Entry.objects.delete()`的动作，而不慎删除了所有的条目。如果你确实想删除所有的对象，你必须明确地请求一个完全的查询集，像下面这样：

```python
Entry.objects.all().delete()
```



### 六、更多关于QuerySet



#### 何时被提交？

在内部，创建、过滤、切片和传递一个QuerySet不会真实操作数据库，在你对查询集提交之前，不会发生任何实际的数据库操作。

可以使用下列方法对QuerySet提交查询操作：

- **迭代**

QuerySet是可迭代的，在首次迭代查询集时执行实际的数据库查询。 例如， 下面的语句会将数据库中所有Entry的headline打印出来：

```python
for e in Entry.objects.all():
    print(e.headline)
```

- **切片**：如果使用切片的”step“参数，Django 将执行数据库查询并返回一个列表。
- **Pickling/缓存**
- **repr()**
- **len()**：当你对QuerySet调用len()时， 将提交数据库操作。
- **list()**：对QuerySet调用list()将强制提交操作`entry_list = list(Entry.objects.all())`
- **bool()**

测试布尔值，像这样：

```python
if Entry.objects.filter(headline="Test"):
   print("There is at least one Entry with the headline Test")
```

注：如果你需要知道是否存在至少一条记录（而不需要真实的对象），使用exists() 将更加高效。



#### 返回新的QuerySets的API

**以下的方法都将返回一个新的QuerySets。**重点是加粗的几个API，其它的使用场景很少。

| 方法名                | 解释                                         |
| --------------------- | -------------------------------------------- |
| **filter()**          | 过滤查询对象。                               |
| **exclude()**         | 排除满足条件的对象                           |
| **annotate()**        | 使用聚合函数                                 |
| **order_by()**        | 对查询集进行排序                             |
| **reverse()**         | 反向排序                                     |
| **distinct()**        | 对查询集去重                                 |
| **values()**          | 返回包含对象具体值的字典的QuerySet           |
| **values_list()**     | 与values()类似，只是返回的是元组而不是字典。 |
| dates()               | 根据日期获取查询集                           |
| datetimes()           | 根据时间获取查询集                           |
| **none()**            | 创建空的查询集                               |
| **all()**             | 获取所有的对象                               |
| union()               | 并集                                         |
| intersection()        | 交集                                         |
| difference()          | 差集                                         |
| **select_related()**  | 附带查询关联对象                             |
| `prefetch_related()`  | 预先查询                                     |
| extra()               | 附加SQL查询                                  |
| defer()               | 不加载指定字段                               |
| only()                | 只加载指定的字段                             |
| using()               | 选择数据库                                   |
| `select_for_update()` | 锁住选择的对象，直到事务结束。               |
| raw()                 | 接收一个原始的SQL查询                        |



##### filter()

filter(**kwargs)

返回满足查询参数的对象集合。

查找的参数（**kwargs）应该满足下文字段查找中的格式。多个参数之间是和AND的关系。



##### exclude()

exclude(**kwargs)

返回一个新的QuerySet，它包含**不**满足给定的查找参数的对象。

查找的参数（**kwargs）应该满足下文字段查找中的格式。多个参数通过AND连接，然后所有的内容放入NOT() 中。

下面的示例**排除**所有`pub_date`晚于2005-1-3**且**headline为“Hello” 的记录：

```python
Entry.objects.exclude(pub_date__gt=datetime.date(2005, 1, 3), headline='Hello')
```

下面的示例**排除**所有`pub_date`晚于2005-1-3**或者**headline 为“Hello” 的记录：

```python
Entry.objects.exclude(pub_date__gt=datetime.date(2005, 1, 3)).
```



##### annotate()

annotate(*args,* *kwargs)

使用提供的聚合表达式查询对象。

表达式可以是简单的值、对模型（或任何关联模型）上的字段的引用或者聚合表达式（平均值、总和等）。

annotate()的每个参数都是一个annotation，它将添加到返回的QuerySet每个对象中。

关键字参数指定的Annotation将使用关键字作为Annotation 的别名。 匿名参数的别名将基于聚合函数的名称和模型的字段生成。 只有引用单个字段的聚合表达式才可以使用匿名参数。 其它所有形式都必须用关键字参数。

例如，如果正在操作一个Blog列表，你可能想知道每个Blog有多少Entry：

```python
>>> from django.db.models import Count
>>> q = Blog.objects.annotate(Count('entry'))
# The name of the first blog
>>> q[0].name
'Blogasaurus'
# The number of entries on the first blog
>>> q[0].entry__count
42
```

Blog模型本身没有定义`entry__count`属性，但是通过使用一个关键字参数来指定聚合函数，可以控制Annotation的名称：

```python
>>> q = Blog.objects.annotate(number_of_entries=Count('entry'))
# The number of entries on the first blog, using the name provided
>>> q[0].number_of_entries
42
```



##### order_by()

order_by(*fields)

默认情况下，根据模型的Meta类中的ordering属性对QuerySet中的对象进行排序

```python
Entry.objects.filter(pub_date__year=2005).order_by('-pub_date', 'headline')
```

上面的结果将按照`pub_date`降序排序，然后再按照headline升序排序。"-pub_date"前面的负号表示降序顺序。 升序是默认的。 要随机排序，使用"?"，如下所示：

```python
Entry.objects.order_by('?')
```

注：`order_by('?')`可能耗费资源且很慢，这取决于使用的数据库。

若要按照另外一个模型中的字段排序，可以使用查询关联模型的语法。即通过字段的名称后面跟两个下划线（`__`），再加上新模型中的字段的名称，直到希望连接的模型。 像这样：

```python
Entry.objects.order_by('blog__name', 'headline')
```

如果排序的字段与另外一个模型关联，Django将使用关联的模型的默认排序，或者如果没有指定Meta.ordering将通过关联的模型的主键排序。 例如，因为Blog模型没有指定默认的排序：

```python
Entry.objects.order_by('blog')
```

与以下相同：

```python
Entry.objects.order_by('blog__id')
```

如果Blog设置了`ordering = ['name']`，那么第一个QuerySet将等同于：

```python
Entry.objects.order_by('blog__name')
```

还可以通过调用表达式的desc()或者asc()方法：

```python
Entry.objects.order_by(Coalesce('summary', 'headline').desc())
```

考虑下面的情况，指定一个多值字段来排序（例如，一个ManyToManyField 字段或者ForeignKey 字段的反向关联）：

```python
class Event(Model):
   parent = models.ForeignKey(
       'self',
       on_delete=models.CASCADE,
       related_name='children',
   )
   date = models.DateField()

Event.objects.order_by('children__date')
```

在这里，每个Event可能有多个排序数据；具有多个children的每个Event将被多次返回到`order_by()`创建的新的QuerySet中。 换句话说，用`order_by()`方法对QuerySet对象进行操作会返回一个扩大版的新QuerySet对象。因此，使用多值字段对结果进行排序时要格外小心。

没有方法指定排序是否考虑大小写。 对于大小写的敏感性，Django将根据数据库中的排序方式排序结果。

可以通过Lower将一个字段转换为小写来排序，它将达到大小写一致的排序：

```python
Entry.objects.order_by(Lower('headline').desc())
```

可以通过检查`QuerySet.ordered`属性来知道查询是否是排序的。

每个`order_by()`都将清除前面的任何排序。 例如下面的查询将按照`pub_date`排序，而不是headline：

```python
Entry.objects.order_by('headline').order_by('pub_date')
```



##### reverse()

reverse()

反向排序QuerySet中返回的元素。 第二次调用reverse()将恢复到原有的排序。

如要获取QuerySet中最后五个元素，可以这样做：

```
my_queryset.reverse()[:5]
```

这与Python直接使用负索引有点不一样。 Django不支持负索引，只能曲线救国。



##### union() 

union(*other_qs, all=False)

Django中的新功能1.11。也就是集合中并集的概念！

使用SQL的UNION运算符组合两个或更多个QuerySet的结果。例如：

```python
>>> qs1.union(qs2, qs3)
```

默认情况下，UNION操作符仅选择不同的值。 要允许重复值，请使用all=True参数。



##### intersection()

intersection(*other_qs)

Django中的新功能1.11。也就是集合中交集的概念！

使用SQL的INTERSECT运算符返回两个或更多个QuerySet的共有元素。例如：

```python
>>> qs1.intersection(qs2, qs3)
```



##### select_for_update()

select_for_update(nowait=False, skip_locked=False)

返回一个锁住行直到事务结束的查询集，如果数据库支持，它将生成一个`SELECT ... FOR UPDATE`语句。

例如：

```python
entries = Entry.objects.select_for_update().filter(author=request.user)
```

所有匹配的行将被锁定，直到事务结束。这意味着可以通过锁防止数据被其它事务修改。

一般情况下如果其他事务锁定了相关行，那么本查询将被阻塞，直到锁被释放。使用`select_for_update(nowait=True)`将使查询不阻塞。如果其它事务持有冲突的锁,那么查询将引发`DatabaseError`异常。也可以使用`select_for_update(skip_locked=True)`忽略锁定的行。nowait和`skip_locked`是互斥的。

目前，postgresql，oracle和mysql数据库后端支持`select_for_update()`。但是，MySQL不支持nowait和`skip_locked`参数。



#### 不返回QuerySets的API

|         方法名         |               解释               |
| :--------------------: | :------------------------------: |
|       **get()**        |           获取单个对象           |
|      **create()**      |       创建对象，无需save()       |
|  **get_or_create()**   | 查询对象，如果没有找到就新建对象 |
| **update_or_create()** | 更新对象，如果没有找到就创建对象 |
|    `bulk_create()`     |           批量创建对象           |
|      **count()**       |          统计对象的个数          |
|      `in_bulk()`       |  根据主键值的列表，批量返回对象  |
|      `iterator()`      |       获取包含对象的迭代器       |
|      **latest()**      |          获取最近的对象          |
|     **earliest()**     |          获取最早的对象          |
|      **first()**       |          获取第一个对象          |
|       **last()**       |         获取最后一个对象         |
|    **aggregate()**     |             聚合操作             |
|      **exists()**      |     判断queryset中是否有对象     |
|      **update()**      |           批量更新对象           |
|      **delete()**      |           批量删除对象           |
|      as_manager()      |            获取管理器            |

