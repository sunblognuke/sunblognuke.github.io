title: DNN9升级备忘
date: 2019-07-08 11:23:58
categories: Dev
description:
tags: [DNN, CMS]
---

自从2005年开始接触DNN这一平台以来，一直持续关注它的发展和整个生态圈的趋势，起初的确参与了很多，国内圈子也的确掀起一股小小的追捧，然而好景不长，陆续续续大家没了激情，DNN CMS在国内犹如昙花一现，大家转而找其他的替代品，比如Orchard等。不过我一直算还在这个圈子混，官网的资讯也在持续关注中，期盼它能有更好的未来。近期针对DNN9的升级做些功课，期待这次有更强大的性能提升。

## DNN9的最佳升级路径

关于DNN9升级的技术文章和最佳实践：

+ [UPGRADING DOTNETNUKE](https://www.dnnsoftware.com/wiki/upgrading-dotnetnuke)
+ [SUGGESTED UPGRADE PATH](https://www.dnnsoftware.com/wiki/suggested-upgrade-path)
+ [DNN 9.2 Upgrade What You Need to Know](https://www.dnnsoftware.com/community-blog/cid/155511/dnn-92-upgrade-what-you-need-to-know)
+ [DNN 8 BREAKING CHANGES](https://www.dnnsoftware.com/wiki/dnn-8-breaking-changes)

此外还有一些小提示：

1. 可备份数据库文件db_name.bak,拷贝该备份文件到网站根目录下的App_Data文件夹里，重命名为db_name.resources
2. 创建一个app_offline.htm.exclude文件, 让其在你执行正式升级时生效（重命名为app_offline.htm）
3. 默认升级链接 http://MYWEBSITE/install/install.aspx?mode=upgrade

## DNN7.3 升级到 DNN9.3 

1. FTP下载网站根目录wwwroot到本地，创建本地测试应用程序localhost/xx_name，检查应用目录的权限配置是否正确, 比如network service, iis_user等
2. 恢复数据库文件到测试应用，修改PortalAlias数据库表www.xx_name.com->localhost/xx_name
3. 检查web.config,修改connectionString数据库连接字符串,验证web.config是否有效，比如可能需要删除节点<rewrite>...</rewrite>
4. 访问应用链接localhost/xx_name检验是否迁移到本地成功


## 其他关于DNN9的注意点

+ [Problems with DNN 9 and the HTML Editor Manager](https://www.chrishammond.com/Blog/itemId/2898/Problems-with-DNN-9-and-the-HTML-Editor-Manager)
+ [Dealing with the DNN Exceptions table in your DotNetNuke Database](https://www.chrishammond.com/Blog/itemId/2693/Dealing-with-the-DNN-Exceptions-table-in-your-DotN)

