title: 打包DNN模块的简易技巧
date: 2016-07-16 20:16:07
categories: [Dev]
description:
tags: [DNN]
---

对于稍微复杂些的DNN模块，参考Manifest清单文件的相关节点信息可简易打包最易管理的模块安装包。比如可参考大神Bruce Chapman提到的以下5点：

[Top 5 DotNetNuke Manifest file Module Packaging Tips](http://www.ifinity.com.au/Blog/EntryId/89/Top-5-DotNetNuke-Manifest-file-Module-Packaging-Tips)

1. Use Html in the File for better layout in the install pages
2. Use a resources.zip file for all your files
3. Use a html file for your Licence Agreement
4. Make your module DNN 4.x and DNN5.x compatible by using two separate manifest files.
5. Use the ‘sourceFileName’ attribute for your assembly files.

其他官方文档可参考如下链接：

[Types of Manifests](http://www.dnnsoftware.com/wiki/manifests)

[The DNN Manifest Schema](http://www.dnnsoftware.com/docs/designers/extensions/dnn-manifest-schema.html)

目前发现releasenotes这一节点只能这样用：

     <releaseNotes src="Installation\ReleaseNotes\Release.07.03.00.txt"></releaseNotes>

错误的用法：

    <releaseNotes>
        <releaseNote src="Installation\ReleaseNotes\Release.07.03.00.txt"/>
    </releaseNotes>
