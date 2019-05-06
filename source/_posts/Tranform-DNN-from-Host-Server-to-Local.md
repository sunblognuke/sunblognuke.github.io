title: DNN番外篇 - 服务器到本地迁移
date: 2017-04-13 10:09:39
categories: [Dev]
description:
tags: [DNN9, CMS]
copyright: false
toc: false
---
这段时间想把服务上的DNN7升级到最新版本DNN9，为了保险起见，提前在本地搭建一个测试的升级环境。故关键第一步就是如何把托管服务器上的网站环境部署到本地。期间碰到两个重要问题：

## 数据库备份文件的导入

本想新建一个空数据库，然后直接导入bak备份文件，系统提示错误（代码号：3154）：

The backup set holds a backup of a database other than the existing "xx" database...

**解决方案：**

-- Don't create an empty database and restore the .bak file on to it.
-- Use 'Restore Database' option accessible by right clicking the "Databases" branch of the SQL Server Management Studio and provide the database name while providing the source to restore.

同时保证相应的xxx.mdf等文件是有效路径即可。

## 网站的本地部署

DNN网站目录的权限、数据库的PortalAlias对应的记录也修改成本地IIS的相关设置完成后即可访问。然而我们碰到一个IIS的错误提示：

HTTP 错误 500.19

原因：原本托管服务上的IIS安装了[url rewrite module](http://www.iis.net/download/urlrewrite), 而我们本地IIS没有安装这一组件。

**解决方案：** 

安装组件[url rewrite module](http://www.iis.net/download/urlrewrite)或注释web.config的配置项：

    <!--<rewrite>
      <rules>
        <rule name="Redirect01" stopProcessing="true">
          <match url="^account-login.aspx$" ignoreCase="true" />
          <action type="Redirect" url="/signin" redirectType="Permanent" />
        </rule>
        <rule name="Redirect02" stopProcessing="true">
          <match url="^account_login.aspx$" ignoreCase="true" />
          <action type="Redirect" url="/signin" redirectType="Permanent" />
        </rule>
        <rule name="Redirect03" stopProcessing="true">
          <match url="^showcase.aspx$" ignoreCase="true" />
          <action type="Redirect" url="/company/case-studies" redirectType="Permanent" />
        </rule>
      </rules>
    </rewrite>-->


