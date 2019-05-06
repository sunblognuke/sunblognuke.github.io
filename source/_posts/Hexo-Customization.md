title: Hexo折腾记
date: 2015-11-20 16:06:23
categories: Blog
description:
tags: [Hexo, Blogging]
---

## 自定义404页面

直接在根目录（指的不是Hexo目录下，而是Hexo/source目录下）下创建自己的 404.html 就可以。如腾讯公益404页面：

	<html>
	<head>
	<meta charset="UTF-8" />
	<title>404 | Hacker's Blog</title>                   
	</head>
	<body>
	<script type="text/javascript" src="http://www.qq.com/404/search_children.js" charset="utf-8"></script>
	</body>
	</html>


## 启用第三方评论系统

静态博客只能使用第三方评论系统，在此整合**多说**为例。直接用你的微博/豆瓣/人人/百度/开心网帐号登录多说。同时修改当前主题的配置文件，比如/themes/jacman/_config.yml，找到选项duoshuo_shortname, 替换成你的账号即可：

	#### Comment
	duoshuo_shortname: sunblognuke   ## e.g. wuchong   your duoshuo short name.
	disqus_shortname:     ## e.g. wuchong   your disqus short name.

你也可以在多说后台自定义CSS，比如评论头像鼠标悬停旋转效果和隐藏多说底部版权，代码如下：

	.ds-avatar{-webkit-border-radius: 5px !important;/*圆角效果：兼容webkit浏览器*/
	-moz-border-radius:5px !important;
	box-shadow: inset 0 -1px 0 #3333sf !important;/*设置图像阴影效果*/
	-webkit-box-shadow: inset 0 -1px 0 #3333sf !important;
	-webkit-transition: 0.4s !important;
	-webkit-transition: -webkit-transform 0.4s ease-out !important;
	transition: transform 0.4s ease-out !important;/*变化时间设置为0.4秒(变化动作即为下面的图像旋转360度）*/
	-moz-transition: -moz-transform 0.4s ease-out !important; }
	.ds-avatar:hover{box-shadow: 0 0 10px #fff !important; rgba(255,255,255,.6), inset 0 0 20px rgba(255,255,255,1) !important;
	-webkit-box-shadow: 0 0 10px #fff; rgba(255,255,255,.6), inset 0 0 20px rgba(255,255,255,1) !important;
	transform: rotateZ(360deg) !important;/*图像旋转360度*/
	-webkit-transform: rotateZ(360deg) !important;
	-moz-transform: rotateZ(360deg) !important;}
	/*隐藏多说底部版权*/
	#ds-thread #ds-reset .ds-powered-by {
		display: none;
	}

更多教程参看《[多说CSS修改](http://dev.duoshuo.com/threads/4ff1cfd0397309552c000017)》

[动动手指，给你的Hexo站点添加最近访客（多说篇）](http://www.arao.me/2015/hexo-next-theme-optimize-duoshuo/)

## 整合Swiftype站内搜索

__更新：swiftype开始收费，目前这一设置对大部分已经不实用了。__

参考这两篇教程：

[使用swiftype实现站内搜索](http://opiece.me/2015/04/16/site-search-by-swiftype/)

[Swiftype 专业站内搜索工具](http://gsgundam.com/2015-03-03-swiftype-professional-search-tool/)

[利用swiftype为hexo添加站内搜索v2.0](http://www.jerryfu.net/post/search-engine-for-hexo-with-swiftype-v2.html)

步骤大概如下:

1. 新建文件swiftype_search.ejs，代码如下：

		<% if (theme.swiftype_search.enable){ %>
		<script type="text/javascript">
		  (function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
		  (w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
		  e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
		  })(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');
		
		  _st('install','<%= theme.swiftype_search.id %>','2.0.0');
		</script>
		<% } %>

2. 添加代码到文件after_footer.ejs：

		<!-- Swiftype_search Begin -->
		<%- partial('swiftype_search') %>
		<!-- Swiftype_search End -->

2. 添加配置项到主题文件_config.yml

		swiftype_search:
		  enable: true
		  id: "zpAq-EQUfMzEzP6ybWEU" ## e.g. "zpAq-EQUfMzEzP6ybWEU" for your swiftype search id

3. 添加class - st-default-search-input到header.ejs

## 部署Github的README.md

如何部署Github时保证README.md不被渲染：

- 添加README.md文件：Hexo目录下的source根目录下创建README.md文件，编辑保存。

- 防止README.md被渲染：编辑Hexo目录的_config.yml文件中的“skip_render”参数，skip_render: README.md

