title: Integrated DNN Blog with Javascript syntax highlighter
date: 2016-07-21 19:32:58
categories: [Dev]
description:
tags: [DNN, Markdown, syntax highlighter]
---

# What is Highlight.js?

Highlight.js is a syntax highlighter written in JavaScript. It works in the browser as well as on the server. It works with pretty much any markup, doesn’t depend on any framework and has automatic language detection.

[Project on Github](https://github.com/isagalaev/highlight.js)

# Why we should use Highlight.js?

- 162 languages and 74 styles
- automatic language detection
- multi-language code highlighting
- available for node.js
- works with any markup
- compatible with any js framework
- works well with Markdown

# How to apply Highlight.js with DNN Blog?

1. Assume that you installed our blogging module called '[SunBlogNuke](http://www.sunblognuke.com/products/features)'

2. Built blog instance with offical guidelin and enter Dashboadr/Customize/Style Editor section.
3. From the right section, you should be able choose any theme view to be apply with Highlight.js. For example, the BasicView.ascx is for every item of the default post list when first loading blog page.

    choose it and copy the following coding below to register Highlight.js into this view:

        <%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
        <dnn:DnnJsInclude runat="server" ID="jshighlight" FilePath="~/DesktopModules/SunBlog/js/highlight/highlight.min.js" Priority="100" />

    yes, you feel free to replace CDN-hosted package, like that:

        <%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
        <dnn:DnnJsInclude runat="server" ID="jshighlight" FilePath="http://cdn.bootcss.com/highlight.js/9.5.0/highlight.min.js" Priority="100" />

    click "save chanegs".

4. Click the customized.js to add any javascript, now we want to init Highlight.js to make it work:

        jQuery(document).ready(function () {
            if (typeof hljs=== 'undefined'){}
            else
                hljs.initHighlightingOnLoad();
        });

5. In the last, just make sure that you also register Highlight.js style, there is lots of way to complete, such as in the dnn skin or module style or dnn blog theme style. The core simplicity theme includes Highlight.js style in default, you may have a try.

BTW, the curent post is exactly writtten by Markdown and live demo for this JavaScript syntax highlighter :)








