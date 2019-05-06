title: 基于Django和Virtualenv搭建博客开发实战
date: 2016-05-26 15:32:45
categories: [Dev]
description:
tags: [Python, Django, VirtualEnv]
---

# 利用Virtualenv搭建Django环境
1. 确保安装Python3，请参照python2和python3共存win7的解决方案。
2. 创建虚拟环境, 创建目录py3env

        python3 -m venv py3env

3. 定位到目录py3env\scripts并激活虚拟环境：

        E:\virt_env\py3env\Scripts>activate
        (py3env) E:\virt_env\py3env\Scripts>

4. 手动安装Django

        pip install django==1.9.6

    或直接clone项目到本目录下E:\virt_env\py3env\Scripts>并定位到项目目录下执行：

        pip install -r requirements.txt

    requirements.txt文件，主要用于搭建运行这个项目所需要的环境，一般包含项目所需的一些包的名称和版本之类的信息。

# Django基本命令

1. 运行命令 python manage.py makemigrations 生成迁移文件

2. 运行命令 python manage.py migrate 迁移数据库

3. 运行命令 python manage.py createsuperuser 创建超级用户

4. 运行命令 python manage.py runserver 启动开发服务器

# 参考资源

[Django 1.8.2 文档](http://python.usyiyi.cn/django/index.html)
[Django 基础教程](http://www.ziqiangxuetang.com/django/django-tutorial.html)
[Virtualenv官网文档](http://virtualenv-chinese-docs.readthedocs.io/en/latest/#id29)
[Python Virtualenv 介绍](http://foofish.net/blog/88/virtualenv)
