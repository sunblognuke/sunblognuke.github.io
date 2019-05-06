title: Sublime Text for Python Dev
date: 2016-01-13 09:15:08
categories: Dev
description:
tags: [Python, Sublime Text]
---
![](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/sublimetext.jpg)

## 何为Sublime Text

Sublime Text是一个轻量、简洁、高效、跨平台的编辑器。Sublime Text更妙的是它的可扩展性，它拥有强大的插件支持，几乎无所不 能。目前已经更新到Sublime Text 3支持OS X、Windows、Windows 64 bit、Ubuntu 64 bit和 Ubuntu 32 bit。免费下载、超快速超稳定，可以处理大量超大文件。总之，这是一款神器级别的代码编辑器。

参考资料:

[http://www.iplaysoft.com/sublimetext.html](http://www.iplaysoft.com/sublimetext.html)

## 安装Package Control

1.通过快捷键 ctrl+`(Esc键下边或跟~公用的) 或者 View > Show Console 打开控制台，然后粘贴相应的安装代码（Python代码），从[官方网站](https://packagecontrol.io/installation)可获取, 比如#st2:

    import urllib2,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')

2.回车运行安装代码。

3.重启Sublime Text 2/3。

4.如果在Perferences->package settings中看到package control这一项，则安装成功。

## 利用Package Control安装插件

1.按下Ctrl+Shift+P调出命令面板

2.输入install调出Install Package选项并回车，然后在列表中搜索或选中要安装的插件。如图:
![Pakcage Control: Install Package](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/SublimeText_Package_Control.png)

3.根据网络速度不同Package加载时间不等，稍等片刻即可安装指定插件。

## Python开发插件

- **SublimeCodeIntel** 智能提示插件，为部分语言增强自动完成功能，包括Python 。这个插件同时也可以让你跳转到符号定义的地方，通过按住alt 并点击符号，非常方便。
- **SublimeREPL** Python调试插件。可将Sublime Text布局模式切换为2行模式（Shift+Alt+8），然后tool->SublimeREPL->Python->Python - PDB Current File打开pdb调试界面。然后你就可以输出各种pdb命令进行调试了。比如：

        (Pdb) b 31              #在31行建立断点
        (Pdb) r                 #运行到断点处
        (Pdb)                   #在这个命令行下就可以执行当前上下文的python

## 其他相关问题

1.弹出错误信息：
A plugin (SublimeCodeIntel) may be making Sublime Text unresponsive by taking too long (0.020000s) in its on_modified callback.
This message can be disabled via the detect_slow_plugins setting

解决方法：打开preference->setting_user
添加

    "detect_slow_plugins": false

这样以后就不会弹出类似提示了。

2. php代码自动提示与补全设置

解决方法：打开preference->setting_user
添加

    "auto_complete": true,
    "auto_match_enabled": true
