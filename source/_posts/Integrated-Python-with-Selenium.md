title: Python整合Selenium获取Ajax页面
date: 2016-02-24 19:03:19
categories: Dev
description:
tags: [Python, Selenium]
---

## What is selenium? 

Selenium 是一个可以让浏览器自动化地执行一系列任务的工具，常用于自动化测试

## Selenium安装

参照另外一教程文章[Windows下Python easy_install和pip的安装](http://sunblognuke.github.io/2016/01/13/Python-esay-install-pip-for-Windows/):

    easy_install selenium 

## 范例一：网页截图

    #!/usr/bin/env python
    # coding: utf-8

    import os, sys, time, datetime
    import urllib
    import urllib2
    from selenium import webdriver

    reload(sys)
    sys.setdefaultencoding('utf-8')

    def mock_screenshot(url, width, height, imgPath = 'screenshot.png'):
        # browser = webdriver.PhantomJS('E:\Downloads\phantomjs-1.9.7-windows\phantomjs.exe')  #浏览器初始化；Win下需要设置phantomjs路径，linux下置空即可
        browser = webdriver.Firefox()
        browser.set_window_size(width, height) #参考当前PC的分辨率
        browser.get(url)  # 打开网页

        browser.execute_script("""
            (function () {
              var y = 0;
              var step = 100;
              window.scroll(0, 0);
         
              function f() {
                if (y < document.body.scrollHeight) {
                  y += step;
                  window.scroll(0, y);
                  setTimeout(f, 50);
                } else {
                  window.scroll(0, 0);
                  document.title += "scroll-done";
                }
              }
         
              setTimeout(f, 1000);
            })();
          """)

        for i in xrange(1024):
            if "scroll-done" in browser.title:
              break
            time.sleep(1)

        browser.save_screenshot(imgPath)

        browser.quit()  # 关闭浏览器。当出现异常时记得在任务浏览器中关闭PhantomJS，因为会有多个PhantomJS在运行状态，影响电脑性能

注意到，上面的代码中，并没有在打开页面后立即截图，而是先在页面上执行了一段Javascript脚本，先将页面的滚动条拖到最下方，再拖回顶部，然后才截图。这样的好处是如果页面下方有一些ajax延迟加载的内容，在这个操作之后一般其他内容也都已加载了，如此截图才完整些。

## 范例二：模拟鼠标点击等行为

由范例一我们可以举一反三，我们可以执行某一段js脚本或ajax请求以获取指定或我们想要的内容，甚至模拟鼠标点击等行为让浏览器自动化地执行某些操作。
        
        # other coding above

        browser.get(url)  # 打开网页

        jsActionElem = browser.find_element_by_class_name('tit_a')

        jsActionElem.click()

        # other coding continuing ...
