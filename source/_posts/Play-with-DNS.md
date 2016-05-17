title: 科学上网之DNS
date: 2015-12-22 14:31:03
categories: Resources
description:
tags: [DNS]

---
## 何为DNS?

DNS 的全称是 Domain Name System 或者 Domain Name Service，以显浅的语言来解释，对于上网的用户来说，DNS 就是一台(或多台)在网络上的服务器，专门为大家上网时解析网址的IP地址的。互联网被发明时是需要靠 IP 地址去定位网络上的服务器或网络设备的，它可以看做是一个网站的门牌号，但IP地址(如 124.122.45.2)这样的数字实在太难被人们所记住，如果上任何网站都需要输入这样的地址恐怕对任何人来说都是噩梦！于是，人们发明了域名（网址），也就是像 iPlaySoft.com 这样有意义的单词组合来帮助人们记忆与输入。

不过，虽然人能看懂域名，但电脑却只懂 IP 地址，那怎么办呢？嗯，当你用电脑访问异次元的域名 www.iPlaySoft.com 时，就要有一位懂得“翻译”的“指路人”去告诉你的电脑，www.iPlaySoft.com 究竟对应的是哪个IP地址了，这样你的电脑才懂得怎样去找到异次元的服务器并下载你要访问的网页内容。而这个“指路人”的角色就是DNS。

更详细参看百科词条: [http://baike.baidu.com/item/dns/427444](http://baike.baidu.com/item/dns/427444)

[DNS知识平台](http://dudns.baidu.com/intro.html)

# 手动修改DNS

[设置DNS详细教程](http://dudns.baidu.com/useDoc.html)

一般修改了dns, 需要手动清除本地的dns缓存: 进入命令行提示符，输入 ipconfig /flushdns 并回车即可。

# 第三方DNS 服务

1. [114DNS](http://www.114dns.com/index.html): 114.114.114.114
2. 谷歌DNS: 8.8.8.8 / 8.8.4.4
3. [阿里DNS](http://www.alidns.com/index.html): 223.5.5.5 / 223.6.6.6
4. [百度DNS](http://dudns.baidu.com/): 180.76.76.76

# 自动化软件  - DnsJumper

DNS Jumper 完全免费，绿色免安装，体积非常小巧，经测试支持 Windows 8、Win7、Vista、XP，支持64位与32位系统，支持多网卡分别设置（譬如WIFI无线网卡以及普通的以太网网卡），提供了包含简体中文在内的多国语言。

它不但内置了 Google Open DNS、Comodo DNS 等大量免费公共DNS，还可以让用户自由手动添加/删除自己收集的地址。更实用的是，它还可以为你的DNS列表批量测速并自动选择最快的进行应用，而且也能一键清空本地DNS缓存。

[下载地址](http://www.iplaysoft.com/dnsjumper.html)
