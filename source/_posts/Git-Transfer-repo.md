title: Git迁移代码仓库实践
date: 2019-04-26 10:23:58
categories: [Resources]
description:
tags: [Git,GitHub,DNN]
---

最近有个新需求，鉴于Github已具备免费搭建私有仓库的功能，于是我们团队立即着手迁移部分项目到Github来（原本托管于Dropbox），目前效果良好。

我们需要的原本的仓库包括所有记录都能迁移到新库上，一开始找到的方案都只能迁移master和tag分支，其他分支branch还要一个一个来，麻烦得很。后来找最终解决方案，迁移所有记录包括所有的分支、标签、日志，一个不少。

## GIT迁移全库

主要使用如下四行命令，建议直接在命令行窗口执行，比如DOS或Powershell:

	git clone --mirror <URL to my OLD repo location>        //git clone --mirror http://xxxx.com/yyyy.git
	cd <New directory where your OLD repo was cloned>       //cd yyyy.git
	git remote set-url origin <URL to my NEW repo location> //git remote set-url origin https://github.com/youracount/yyyyNEW.git
	git push -f origin 

