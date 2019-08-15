---
layout: single
author_profile: true
toc: false
title: Django
---

{% for page in site.Django %}  
  {% if page.title != 'Django'%}
  <h3><a href="{{ page.url }}">{{ page.title }}</a></h3>
  {% endif %}
{% endfor %}
