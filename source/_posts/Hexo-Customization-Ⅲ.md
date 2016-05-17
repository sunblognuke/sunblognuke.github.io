title: Hexo折腾记 Ⅲ
date: 2015-12-04 09:17:35
categories: Blog
description:
tags: [Hexo, Blogging]

---

用Hexo搭建本博客至今为止，感觉不错，管理起来很方便，Markdown排版文字的确很赞。接下来这一篇文章想更为深入的探讨，比如如何编程的方式来修改Hexo成更为灵活的布局或创建新的功能：

## 边栏Widget - 最新随笔

可直接自己在模板template写或通过帮助创建Hexo helper plugin来实现。在此分享后者的做法：

**代码原理**

获取指定目录或全站的随笔并排序遍历输出而已

	<% site.categories.findOne({name: 'project'}).posts.sort('date', -1).each(function(post){ %>
	    <li>
	      <a href="<%- url_for(post.path) %>"><%= post.title || '(no title)' %></a>
	    </li>
	<% }) %>

- 执行代码安装插件recent_posts

		npm install hexo-helper-recent_posts --save

- 在主题目录下的_widget目录下新建widget文件recent_posts.ejs (比如ROOT\themes\jacman\layout\_widget)，代码如下（如有必要可自定义修改ulClass和liClass并添加相关的样式）：

		<div class="linkslist">
		    <p class="asidetitle"><%= __('recent_posts') %></p>
		    <div class="linkslist clearfix">
				<%- recent_posts({ 	count: 6, 
									ulClass: '',
		    						liClass: ''}) %>
			</div>
		</div>	


- 打开主题_config.yml, 启用recent_posts这一widget：

		#### Widgets
		widgets: 
		- github-card
		- category
		- tag
		- recent_posts // 启用recent_posts
		- links
		##- douban
		- rss
		##- weibo

相关链接：

[hexo-helper-recent_posts](https://github.com/floriancargoet/hexo-helper-recent_posts)

https://github.com/hexojs/hexo/issues/459

[Querying posts in Hexo](http://tobuildsomething.com/2015/08/01/Finding-all-posts-with-a-given-category-in-Hexo/)

https://github.com/JamesPan/hexo-theme-icarus/blob/master/layout/_widget/recent_posts.ejs

##	创建Filter - 文章尾部增加版权信息

Hexo博客系统天生具有良好的可扩展性，Hexo的插件基本上分为Deployer、Filter、Generator、Renderer、Tag等很多种类。其中Filter插件可用于修改一些特定的数据。比如这种[before_post_render Filter](https://hexo.io/api/filter.html#before_post_render)会在文章正式渲染之前执行，具体的执行和渲染步骤可以参见关于[渲染的官方文档](https://hexo.io/api/posts.html#Render)。

相关链接:

[为Hexo博客的每一篇文章自动追加版权信息](http://kuangqi.me/tricks/append-a-copyright-info-after-every-post/index.html)