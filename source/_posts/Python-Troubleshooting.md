title: Python Troubleshooting
date: 2016-01-11 11:57:03
categories: Resources
description:
tags: [Python, Framework]
copyright: false
---

## PyQuery: 一个类似jQuery的Python库

PyQuery是一个类似于jQuery的Python库，也可以说是jQuery在Python上的实现。pyQuery是使用lxml来实现快速的xml和html操作的。具体的PyQuery文档见：[http://pyquery.org](http://pyquery.readthedocs.org/en/latest/api.html)

## Python轻量级ORM - Peewee

最新API：[Python轻量级ORM - Peewee](http://peewee.readthedocs.org/en/latest/)

like匹配语句:

    xxModel.select().where(xxModel.author ** 'zh%')

## requests.get 获取页面乱码
查看一下网页的编码，比如是gbk
    
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />

那就需要response设置为r.encoding='gbk', 代码如下:

    r = requests.get(self.url, headers=config.HEADERS)
    r.encoding = 'gb2312'
    return r.text

## IndentationError: unindent does not match any outer indentation level

解决方案：这主要是TAB键和空格混搭使用造成的，需要统一一下对齐的风格即可。

## urllib2.HTTPError: HTTP Error 403: Forbidden

解决方案：ulr请求需要模拟真实的浏览器访问，需要设置User-Agent项，最简便的方式就是随机获取，代码如下:

    # -*- coding: UTF-8 -*-
    import sys
    import random

    reload(sys)
    sys.setdefaultencoding('utf-8')

    USER_AGENTS = [
                    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
                    'Mozilla/5.0 (Windows; U; Windows NT 5.1; it; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
                    'Opera/9.25 (Windows NT 5.1; U; en)',
                    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
                    'Mozilla/5.0 (compatible; Konqueror/3.5; Linux) KHTML/3.5.5 (like Gecko) (Kubuntu)',
                    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
                    'Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
                    'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.7 (KHTML, like Gecko) Ubuntu/11.04 Chromium/16.0.912.77 Chrome/16.0.912.77 Safari/535.7',
                    'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:10.0) Gecko/20100101 Firefox/10.0'
                ]

    #伪装浏览器头
    HEADERS = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'User-Agent': random.choice(USER_AGENTS),
        'Referer': 'http://www.baidu.com' # or 'http://www.google.cpm'
    }

## 装饰器

## @classmethod 或 @staticmethod
参考知乎话题 - [https://www.zhihu.com/question/21084971](https://www.zhihu.com/question/21084971)
