title: 基于Vagrant搭建全栈式的Python开发环境
date: 2016-05-10 10:14:35
categories: Dev
description:
tags: [Python, Vagrant, Virtualbox, Ubuntu]
---

![基于Vagrant搭建全栈式的Python开发环境](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/vagrant.png)

## What is Vagrant?

vagrant是建立在虚拟机基础上的虚拟环境管理工具。可用于快速创建基于VirtualBox、VMware、AWS的虚拟机，提供易于配置，重复性好，便携式的工作环境。也可以和puppet，chef结合，实现虚拟机管理的自动化。

对于前提——虚拟机，官方推荐使用VirtualBox，因为免费/容易获取/支持各平台/vagrant内嵌。

对于被管理的对象——虚拟环境，vagrant就是为了避免创建虚拟机繁琐的过程而出现的，它将一个虚拟环境封装为一个基础镜像，并给了一个生动的名字——box，所以这里的虚拟环境就是box。而管理，也就是添加，使用，销毁这些操作了。

## vagrant安装

[https://www.vagrantup.com](https://www.vagrantup.com)

[https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

## vagrant基本命令行

1. vagrant init

    一个普通的目录要成为vagrant可用的目录，需要初始化一下。初始化之后可以发现在目录下多了一个Vagrantfile文件，查看此文件，发现有很多被注释的配置示例，请参照《Vagrantfile基本配置文件详解》修改。

2. vagrant box add

    目前我们只是拥有一个vagrant可用的目录。下一步自然是需要一个虚拟环境，在box列表中没有所需的虚拟环境时可以这么做：HashiCorp's Atlas box catalog里聚集了各种可用的box，进入挑选一番，比如说看中了ubuntu/trusty64，在终端运行vagrant box add ubuntu/trusty64，vagrant会从服务器下载ubuntu/trusty64并添加进box列表，可用vagrant box list查看。当然也可以手动将box下载至本地，再添加vagrant box add boxname ~/box/ubuntu/trusty64。一般建议执行本地添加box。

3. vagrant up

    一切就绪，启动虚拟环境，打开virtual box可以发现该虚拟机已启动。

4. vagrant ssh

    以ssh登录虚拟环境，OK，已进入box，之后就可以通过终端在你的虚拟环境里做任何事情了

5. vagrant reload

    重新加载当前虚拟环境。如果你修改了vagrantfile配置项后，一般需要执行此操作来更新起效。

6. vagrant halt

    挂起，顾名思义，关闭当前虚拟环境。

7. vagrant destroy

    彻底销毁当前虚拟环境。慎用。

8. vagrant package

    可对当前虚拟环境打个包，不仅能存下当前环境，还能随身带随时用。其他用户只要添加这个box，用其初始化自己的开发目录就能得到一个一模一样的虚拟开发环境了。

9. vagrant box remove virtualbox_name

    删除本地指定名称的box，可通过vagrant box list得到当前所有存在的box名称里列表。


## Vagrantfile基本配置文件详解

Vagrant使用Ruby开发，所以它的配置语法也是Ruby的。
修改完Vagrantfile配置后，必须用vagrant reload重启VM后，配置才能生效。

1. 配置基本说明

        Vagrant.configure(2) do |config|
        #......
        end

    configure("2")描述的是使用Vagrant 2.0.x配置方式。
    Vagrant 1.0.x的配置方式为:Vagrant::COnfig.run do |config| ...

2. box设置

        config.vm.box = "boxIdentity"

    配置Vagrant要去启用哪个box作为系统

3. hostname设置

        config.vm.hostname = "go-app"

    host用于识别虚拟主机。特别在有多台虚拟机时，务必进行设置。

4. 网络设置

    Vagrant有两种方式进行网络连接.
    (1)host-only主机模式，意思是主机与虚拟机之间的网络互访。其他人访问不到你的虚拟机。
    (2)bridge桥接模式，此模式下VM如同局域网中的一台独立的直接虚拟机，可以被其他机器访问。

        config.vm.network: private_network, ip: "192.168.33.11"

    这里设置为host-only模式，且虚拟机ip设置为"192.168.33.11"

5. 端口转发

    Vagrant会默认初始化一个端口映射为guest:22, host:2222 也就是说客户机的22端口，将被映射到宿主机的2222端口

        config.vm.network: forwarded_port, guest: 8080, host: 5000

    而以上设置将主机上的5000端口forward到虚拟机的8080端口上。

    __注意:__linux在开启1024（不含1024）之前端口时是需要root权限的。所以一般建议在虚拟机上分配1024以上的端口。

6. 同步目录

    除了默认的/vagrant同步目录外，还可以设置额外的同步目录:

        config.vm.synced_folder "d:/local/dir", "/vagrant_data/"

    第一个参数是本地目录，第二个参数为虚拟机目录。

## Ubuntu安装pip和virtualenv

    $ sudo apt-get install python-pip python-dev build-essential
    $ sudo pip install --upgrade pip
    $ sudo pip install --upgrade virtualenv

## Ubuntu安装git

    sudo apt-get install git

## Ubuntu安装Web.py

    sudo easy_install web.py

执行完之后进入pytohn解释器输入

    >>>import web
    >>>

如果没有出现错误提示（如上）那就证明安装配置成功了。

## Ubuntu安装Flask

    sudo apt-get install python-flask

__注意：__在虚拟机中，创建 Flask App 的时候，修改调用run()的方法使服务器公开可用，让操作系统监听所有公网 IP。不然你没法在主机访问到虚拟机对的web app。

    app.run(host='0.0.0.0')

详细代码如下:

    from flask import Flask  
    app = Flask(__name__)  

    @app.route('/')  
    def hello_world():  
        return 'Hello World!'  

    if __name__ == '__main__':  
        app.run("0.0.0.0", debug=True)
