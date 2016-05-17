title: DNN技巧
date: 2016-02-16 11:23:58
categories: Dev
description:
tags: [DNN, CMS]
---

## 免费可用的DNN模块

收集一些比较优秀的开源模块，其中包括官方原本提供服务支持的模块。

还有一些来源于原本开发DNN商业模块的部分公司，由于业务转型需要不再专注DNN平台，故此之前售卖的DNN模块也因此开发源代码供客户下载，其中包括dnnspot等：

+ [R7模块](https://github.com/roman-yagodin?tab=repositories)
+ [dnnspot模块](http://www.dnnspot.com/Downloads)
+ [Engage模块](https://github.com/EngageSoftware)
+ [DNN Connet社区模块](https://github.com/DNN-Connect)

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

## DNN8开发模板

[BETA DNN 8 Project Templates V6.1 for Visual Studio 2015](https://github.com/ChrisHammond/DNNTemplates/releases/tag/v06.01.00-beta)
