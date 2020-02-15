title: 非华为笔记本使用多屏协同功能
date: 2020-02-15 14:23:58
categories: Life
description:
tags: [HuWei, 多屏协同]
---

多屏协同的功能

1. 可以在电脑上直接控制手机，可以打开任意APP，非常方便！
2. 手机和电脑共享剪切板，共享文件，传输东西非常方便！

## 必备基本条件

1. 有无线网卡的电脑，最好直接是笔记本
2. 华为手机，系统是EMUI10+，芯片麒麟980+
3. 破解版华为电脑管家软件

## 安装华为电脑管家软件

1.下载电脑管家

度盘链接：https://pan.baidu.com/s/1h-VGSrgPWK_PKUYfvSrHpw#list/path=%2F   密码：8j8c

2.安装电脑管家

3.替换文件util.dll

首先在打开任务管理器停止掉几个服务，都是huawei开头的，右键停止就好了。

![关闭华为电脑管家的服务进程](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/2020/huawei-services.png)

然后用度盘链接里面的Util.dll 文件替换电脑管家安装目录下面的同名文件，安装目录一般在C:\Program Files\Huawei\PCManager。

4.重启大法

重启电脑，然后右下角就会出现电脑管家的图标，双击可以打开，点击我的手机，单击是通知中心的页面。

![华为电脑管家](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/2020/0934463o0pwxvh7wzdvcxq.png)

5.联接手机

连接手机时确保电脑的蓝牙和无线网卡是打开的，确保蓝牙和手机能够配对。扫码要使用手机上的华为浏览器或者智慧视觉扫码。

![扫码链接](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/2020/913ad51f3a292df5d766b167b3315c6035a8736a.jpg)

## 成功连接了电脑之后不能呼出手机的界面，怎么破

参照以下原理设置，比如先把电脑的wifi链接断开，然后扫码连接上手机，手机界面正常呈现到电脑端再开启电脑端的wifi。

## 原理

其实就是靠WIFI通信的，802.11n，建议把WIFI切成2.4G的话，就很流畅了，延迟非常小，总的来说还不错。
前提你手机必须开着wifi，但可以不连接网络，电脑也是同理，wifi网卡必须能使用，但可以不连接wifi网络。软件是靠开wifi热点的方式连接的，电脑的任务管理器可以看到多了个WIFI Direct连着手机。

还有个发现，手机分辨率会影响到你快速滑动页面的时候卡不卡，比如在B站这种很多图片的地方滑动，我是mate20pro原来强制开2K，滑动快会顿卡，那种网络卡顿的样子，我看任务管理器瞬时的通信流量可以到30Mbps这样，比较高

