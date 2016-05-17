title: Windows下Python easy_install和pip的安装
date: 2016-01-13 11:21:00
categories: Dev
description:
tags: [Python]
---
## 为何要安装easy_install和pip

easy_install和pip都是用来下载安装Python一个[公共资源库PyPI](https://pypi.python.org/pypi/)的相关资源包的

正常情况下，我们要给Python安装第三方的扩展包，我们必须下载压缩包，解压缩到一个目录，然后命令行或者终端打开这个目录，然后执行

    setup.py build
    setup.py install

来进行安装。这样是不是很繁琐呢？如果我们直接命令行执行

    easy_install libname

就把最新版的扩展包libname安装上去了，是不是很爽呢？
所以easy_install就是为了我们安装第三方扩展包更容易

同理，pip可认为是easy_install的替代品。

## 如何安装easy_install和pip

### 方法1：

1.首先找到easy_install正确的版本进行下载，下载地址：

[http://pypi.python.org/pypi/setuptools](http://pypi.python.org/pypi/setuptools)

比如win7 32位可以下载setuptools-0.6c11.win32-py2.7.exe

或下载ez_setup.py进行安装，在该文件目录上打开cmd命令行或终端执行

    python ez_setup.py

2.安装完成后python的安装目录中会生成scripts目录，其中包括easy_install.exe，然后把该目录添加到Windows系统的环境变量Path里。

### 方法2：

可直接cmd命令行或终端执行来远程安装:

    python ez_setup.py

### 安装pip:

pip下载地址：[https://pypi.python.org/pypi/pip](https://pypi.python.org/pypi/pip)

参考链接:

[http://jingyan.baidu.com/article/b907e627e78fe146e7891c25.html](http://jingyan.baidu.com/article/b907e627e78fe146e7891c25.html)
