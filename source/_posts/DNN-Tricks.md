title: DNN技巧
date: 2016-02-16 11:23:58
categories: Dev
description:
tags: [DNN, CMS]
---

## 免费可用的DNN模块

收集一些比较优秀的开源模块，其中包括官方原本提供服务支持的模块。

+ [2SexyContent模块](https://github.com/2sic/2sxc)
+ [R7模块](https://github.com/roman-yagodin?tab=repositories)
+ [ICG模块](http://www.iowacomputergurus.com/Products/Open-Source)
+ [DNN Connet社区模块](https://github.com/DNN-Connect)

还有一些来源于原本开发DNN商业模块的部分公司，由于业务转型需要不再专注DNN平台，故此之前售卖的DNN模块也因此开发源代码供客户下载，其中包括dnnspot等：

+ [dnnspot模块](http://www.dnnspot.com/Downloads)
+ [Engage模块](https://github.com/EngageSoftware)

## 创建永久链接

只在7.4.1+版本提供支持，通过PageBase.CanonicalLinkUrl这一属性来设置。

一般模块开发需要设置属性获得PageBase：

    public DotNetNuke.Framework.CDefault BasePage {
        get { return (DotNetNuke.Framework.CDefault)this.Page; }
    }

再应用如下：

    //set the CanonicalLinkUrl property of the page 
    this.BasePage.CanonicalLinkUrl = canonicalUrl;

__来源__：[Create a Canonical Url Link in Dnn by using the CanonicalLinkUrl property](Create a Canonical Url Link in Dnn by using the CanonicalLinkUrl property)

## 刪除管理页面的全局模块

有时可能需要在页面顶部或底部增加一些全局模块，比如Social twitter或最新新闻等，勾选该模块的Settings设置项[Display Module On All Pages?]即可。不过这样的后果则是管理页面Admin下的所有页面也添加了这些模块，其实这是没有必要的。只好手动删除，进入Host->SQL页面：

选择数据并核实：

    SELECT t.TabPath, tm.* FROM TabModules tm
    LEFT JOIN Tabs t ON t.TabID = tm.TabID
    WHERE tm.ModuleID = 842 AND t.TabPath LIKE '//Admin//%'

删除之：(谨慎并确保备份数据库)

    DELETE tm FROM TabModules tm
    LEFT JOIN Tabs t ON t.TabID = tm.TabID
    WHERE tm.ModuleID = 842 AND t.TabPath LIKE '//Admin//%'

可能需要清除缓存Tool->Clear Cache.

## 清除异常日志ImageChallenge.captcha.aspx 

在Admin-Event Viewer页面你会经常看到很多关于ImageChallenge.captcha.aspx的异常日志，错误信息大概类似:

    AssemblyVersion: 7.3.1
    PortalID: -1
    PortalName:
    UserID: -1
    UserName:
    ActiveTabID: -1
    ActiveTabName:
    RawURL: /desktopmodules/admin/security/ImageChallenge.captcha.aspx?captcha=D6D87243DABF349C49DC324DFC2B66F8E1ADDBD1356F4140AA170E03C77B055A91DFA47C90A054E011E6FE732E95BB7767BC671D2428C808FC5C27E736428EBDEB2CFCBDF70FBFBBCD8C8B28DFDF8436FFACF3F9997CF30A9E04753C212D362C64EFCF66662B11FC17D014B5028FAF02895DB78AE8C6F4CDF84EE10D249D29B5F46D96EA7E4109A5F03DFFDC0BFD2A2C94CBFE8D0B3A98F892585E18EFBDEBB9AF3BF3C6&alias=www.tarighat-music.com
    AbsoluteURL: /desktopmodules/admin/security/ImageChallenge.captcha.aspx
    AbsoluteURLReferrer:
    UserAgent: Googlebot-Image/1.0
    DefaultDataProvider: DotNetNuke.Data.SqlDataProvider, DotNetNuke.SqlDataProvider
    ExceptionGUID: 58496425-d653-4fcd-aef3-cbec0a5bf8d9
    InnerException: Input string was not in a correct format.
    FileName:
    FileLineNumber: 0
    FileColumnNumber: 0
    Method: System.Number.StringToNumber
    StackTrace:
    Message: System.FormatException: Input string was not in a correct format. at System.Number.StringToNumber(String str, NumberStyles options, NumberBuffer& number, NumberFormatInfo info, Boolean parseDecimal) at System.Number.ParseInt32(String s, NumberStyles style, NumberFormatInfo info) at DotNetNuke.UI.WebControls.CaptchaControl.GenerateImage(String encryptedText )

目前在DNN7+版本下的解决方案是把下列信息添加到网站根目录下的文件robots.txt里：

    User-agent: Googlebot
    Disallow: *captcha*       # remove captcha images that resolve as pages

_参考链接：_

[ImageChallenge.captcha.aspx System.FormatException is flooding the log](http://www.zldnn.com/Products/Module-View/ArticleId/2914/ImageChallenge-captcha-aspx-System-FormatException-is-flooding-the-log)

## 依然持续关注并开发DNN产品的公司及人员

[http://www.iowacomputergurus.com](http://www.iowacomputergurus.com)
[http://www.bitethebullet.co.uk/](http://www.bitethebullet.co.uk/)
[http://www.dotnetnukeblogs.com/](http://www.dotnetnukeblogs.com/)
[http://mitchelsellers.com/](http://mitchelsellers.com/)
[https://github.com/mitchelsellers](https://github.com/mitchelsellers)
[http://dnnextension.com/](http://dnnextension.com/)
[http://www.5stonesmedia.com/blog](http://www.5stonesmedia.com/blog)
[大牛Shaun Walker(DNN创始人)的博客](http://www.siliqon.com/)
