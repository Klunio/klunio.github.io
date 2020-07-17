---
layout: single
author_profile: true
title:  "Leecode #剑指 Offer 60. n个骰子的点数"
date:   2020-07-17 16:54:40 +0800
categories: leecode
classes: wide
toc: true
toc_label: "文章结构"
toc_icon: "align-left"
---

> 把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。
>
>  
>
> 你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 n 个骰子所能掷出的点数集合中第 i 小的那个的概率。
>

#### 示例：

```python
输入: 2
输出: [0.02778,0.05556,0.08333,0.11111,0.13889,0.16667,0.13889,0.11111,0.08333,0.05556,0.02778]
```



通过动态规划的思想，定义函数get_p(n, k)即使n个色子得数为k的几率

例如get(3,3) = (get(2,2) + get(2,1)) / 6

利用函数修饰器，lru_cache可以很快的实现代码，另外根据对称性可以提高速率

```python

class Solution:
    def twoSum(self, n: int):
        import functools
        @functools.lru_cache()
        def get_p(n, k):
            if k > 6*n or k < n:
                return 0
            if n == 1:
                return 1/6
            else:
                _sum = 0
                for i in range(1, 6+1):
                    _sum += get_p(n-1, k-i) * 1/6
                return _sum
        rlt = []
        for i in range(n, (n*6+n)//2+1):
            rlt.append(get_p(n, i))
        if n % 2 == 1:
            rlt += rlt[::-1]
        else:
            rlt += rlt[:-1][::-1]

        return rlt
```

