title: 网络运维
date: 2016-01-29 11:53:44
categories: Resources
description:
tags: [Network]
---

# Teamviewer现在无法捕捉屏幕

### 根源或原因

Teamviewer现在无法捕捉屏幕,这可能是由于快速的用户切换或远程桌面会话已经断开。

这是由于你用“远程桌面”连过去开启teamview的话，当你退出“远程桌面”后，外网用teamview连接就会出现这个问题，

### 解决方法： 
不用远程连接过去开启teamview，直接在在电脑本机上手动开启teamview就可以了
或重启受控方的电脑或服务器即可：shutdown -r -t 0
