title: Hexo折腾记 Ⅱ
date: 2015-11-24 14:16:50
categories: Blog
description:
tags: [Hexo, Blogging]
---
继续捣鼓Hexo博客框架，细化更为个性的地方。比如：
## 新增自定义页面

不妨以新增一个简历页面（个人博客建立优雅的简历页面不失为一个推销自己的方式）为例，不同的主题可能会有些微区别，修改步骤如下：


1. 命令新增页面 `$ hexo new page resume`

2. 拷贝page.ejs并重命名为resume.ejs， 修改代码如下：

		<%- partial('_partial/post/resume', {item: page, index: false,table: false}) %>

3. 按照路径_partial/post/resume在目录post下拷贝article.ejs并重命名为resume.ejs，修改代码如下:

		<div id="main" class="page" itemscope itemprop="blogPost">
			<article itemprop="articleBody"> 
			<header class="article-info clearfix">
			  <h1 itemprop="name">
			    <%= item.title %>
			  </h1>
			</header>
			<div class="article-content">
				<%- item.content %>  
			</div>  	       
			</article>
		</div> 	

4. 打开文件layout.ejs, 增加resume布局的判断代码如下:

		<% } else if(page.layout=='resume'){ %>
		    <%- partial('_partial/head') %>
		      <body>
		        <div id="container">
		          <%- body %>
		        </div>
		      </body>
		     </html>
		<% } else if(page.layout=='page'){ %>

5. 打开路径Hexo\source\resume下的index.md，增加layout: resume设置。
6. （可选）在主题配置文件_config.yml新增菜单：

		##### Menu
		menu:
		  主页 | Home: /
		  ##索引 | Index: /index
		  归档 | Archives: /archives
		  关于 | About: /about
		  简历 | Resume: /resume

此时全部设置完毕，部署后可直接访问your_github_name.github.io/resume访问到该独立简历页面。

## 创建模板帮助插件

你可以在主题目录下的scripts文件夹里创建一些全局性的模板帮助方法，从而在模板直接调用即可。比如我们可以创建一个页面标题的方法，代码如下：

	/** 
	* page_title helper
	*
	* Usage:
	*   <head>
	*     <title><%= page_title() %></title>
	*   </head>
	*/
	
	hexo.extend.helper.register("page_title", function () {
	  var title = this.page.title;
	
	  if (this.is_archive()){
	    title = this.__('archive_a');
	
	    if (this.is_month()){
	      title += ': ' + this.page.year + '/' + this.page.month;
	    } else if (this.is_year()){
	      title += ': ' + this.page.year;
	    }
	  } else if (this.is_category()){
	    title =  this.__('categories')+' : ' + this.page.category;
	  } else if (this.is_tag()){
	    title = this.__('tags')+' : ' + this.page.tag;
	  }
	
	  return title;
	});

注意在此方法体你可以通过this访问到对象page，site，config等，如你所见，一些全局方法比如``is_archive()``或本地化方法``__('archive_a')``都必须经由this来调用。

复制以上代码到新建文件page_title.js里。接下来打开head.ejs并修改呈现页面标题的代码如下：

**原代码：**

	<%
	  var title = page.title;
	
	  if (is_archive()){
	    title = __('archive_a');
	
	    if (is_month()){
	      title += ': ' + page.year + '/' + page.month;
	    } else if (is_year()){
	      title += ': ' + page.year;
	    }
	  } else if (is_category()){
	    title =  __('categories')+' : ' + page.category;
	  } else if (is_tag()){
	    title = __('tags')+' : ' + page.tag;
	  }
	  %>
	    <title><% if (title){ %><%= title %> | <% } %><%= config.title %></title>
**新代码：**

	<% var title = page_title(); %>
	    <title><% if (title){ %><%= title %> | <% } %><%= config.title %></title>

参考教程 - [WRITING HEXO TEMPLATE HELPERS](http://1pixelout.net/2015/09/18/writing-hexo-template-helpers/)