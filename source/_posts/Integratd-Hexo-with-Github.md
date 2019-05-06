title: 在Github平台搭建Hexo免费静态博客
date: 2015-11-20 14:06:23
categories: Blog
description:
tags: [Hexo, Github, Blogging]
---
![Github+Hexo](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/Github_Hexo.png)

## 环境准备 ##

### 安装Git

在此下载:[http://git-scm.com/download/win](http://git-scm.com/download/win)

推荐安装绿色版本PortableGit, 下载解压到一个新文件夹即可，随即添加git.exe所在路径（比如E:\Dev\PortableGit\bin）到环境变量（如何添加环境变量请自行百度）

[Windows下Git安装指南](http://www.cnblogs.com/zhcncn/p/3787849.html)

### 安装node.js

在此下载:[http://nodejs.org/download/](http://nodejs.org/download/)

不必纠缠版本，选择对应系统版本 - x86或x64即可

安装时直接保持默认配置即可。

## 安装Hexo

### Installation

确保git， node安装正确（包括环境变量的配置），可在命令提示符CMD窗口输入git和node，npm看看是否有相关提示。

打开命令提示符，执行如下命令：

    $ npm install -g hexo

如果npm因为各种墙的原因不给力，安装起来卡得死慢，可以考虑替换镜像方案cnpm, 安装如下：

    $ npm install -g cnpm --registry=https://registry.npm.taobao.org

### Quick Start

#### setup your blog

新建目录，比如D:\Hexo, 目录右键进入命令提示符窗口，执行如下命令：

    $ hexo init

    [] Copying data

    [] You are almost ! Dont forget to run `npm install` before you start b
    logging with Hexo!

Hexo随后会自动在目标文件夹建立网站所需要的文件。然后按照提示，运行 npm install（在 D:\Hexo下）

    $ npm install

会在D:\Hexo目录中安装 node_modules。

#### Start the server

运行下面的命令（在D:\Hexo下）

    $ hexo server

    [] Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.

表明Hexo Server已经启动了，在浏览器中打开以上网址，这时可以看到Hexo已为你生成了blog。你可以按Ctrl+C 停止Server。

#### Create new post
运行下面的命令（在D:\Hexo下）

    $ hexo new "My New Post"

会在D:\Hexo\source\_posts目录下生成一个markdown文件：My-New-Post.md

可以使用一个支持markdown语法的编辑器（比如Sublime Text）来编辑该文件。

#### Generate static files

执行下面的命令，将markdown文件生成静态网页。

    $ hexo generate

该命令执行完后，会在 D:\Hexo\public\ 目录下生成一系列html，css等文件。

#### 部署到Github
部署到Github前需要配置_config.yml文件，首先找到下面的内容

    # Deployment
	## Docs: http:hexo.io/docs/deployment.html
	deploy:
	type:

然后修改成如下格式：

	# Deployment
	## Docs: http:hexo.io/docs/deployment.html
	deploy:
	type: git
	repository: https://github.com/xx_yourname/xx_yourname.github.io.git
	branch: master

执行部署命令如下：

    $ hexo clean

    $ hexo deploy

### 命令总结

2.3.1 常用命令

    hexo new postName #新建文章

    hexo new page pageName #新建页面

    hexo generate #生成静态页面至public目录

    hexo server #开启预览访问端口（默认端口4000，ctrl + c关闭server）

    hexo deploy #将.deploy_git目录部署到GitHub

    hexo help  #查看帮助

    hexo version  #查看Hexo的版本

2.3.2 复合命令

    hexo deploy -#生成加部署

    hexo server -g  #生成加预览

命令的简写为：

    hexo n == hexo new

    hexo g == hexo generate

    hexo s == hexo server

    hexo d == hexo deploy
