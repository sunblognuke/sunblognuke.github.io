title: 定制开发通达OA平台
date: 2017-07-18 10:23:58
categories: [Resources]
description:
tags: [信息化,通达OA,MYOA,工作流]
---

总体来说，通达OA的工作流的确让信息化迈进了一个新的台阶，不过精细度和扩展性依旧很弱，故此改造和二次开发无可避免。在此列举一些案例：

## OA精灵窗口默认启用兼容模式

### 需求

整合第三方应用系统时，由于系统默认推荐使用IE兼容模式，若要用户每次都点击由极速模式切换为兼容模式，用户体验极其不好用。

### 解决方法

打开安装目录比如D:\MYOA\webroot\inc文件夹下的url_config.ini 文件。

在文件末行增加 在后面加一行/general/erp/保存，重新登录OA精灵，凡是链接或调用该目录erp下的文件默认打开就是IE内核方式，遂满足用户的定制需求。

## OA精灵打开定制大小的窗口

### 需求

整合第三方应用系统时，默认窗口有时不能满足需求，比如内容比较多的应用门户展示。

### 解决方法

在弹出的窗体调用的文件里，比如ssologin.php或http://xx.xx.xx.ip/client/login.jsp，加入如下JS语句：

    <script Language="javascript">
    //如果从OA精灵打开，则打开指定尺寸w/h大小的窗口
    if(window.external && typeof window.external.OA_SMS != 'undefined')
    {        
        var h = Math.min(1024, screen.availHeight - 180),
            w = Math.min(1690, screen.availWidth - 180);
      
        window.external.OA_SMS(w, h, "SET_SIZE");
    }
    </script>

以上语句，使得OA精灵弹出的窗体的尺寸能得到正确控制，以上语句最好放到JS其他编码的前面，以上语句对各类内核浏览器的WEB状态的显示无任何影响。

参考链接：http://club.tongda2000.com/forum.php?mod=viewthread&tid=16723&extra=&page=1

## 设置列表控件不可输入

### 需求

一旦列表控件绑定数据源，为了保证数据的正确性，禁止用户输入、让用户只能选择无疑是最便捷的方式。可惜目前为止通达OA依然没有实现这一功能，错误数据随处可见，用户体验极其糟糕。

### 解决方法

设计表单时添加辅助脚本JS来在客户端强制验证：

    window.onload = function() { 
      jQuery('#LISTVIEW_DATA_99 input.ConcelBigInput').each(function(i){
        jQuery(this).keydown(function(){
          alert("禁止输入，请选择"); //attr('readonly','readonly');
          jQuery(this).val('');
        });
      });
    };

__注意：__不能用jQuery(document).ready,因为你读取不到动态生成列表控件的TR;不能用attr('readonly','readonly')方式，因为这样你无法把选择后的值赋值到列表的输入框里。

## 列表控件编辑时样式撑大覆盖整个页面

### 问题截图

[](http://114.55.1.254/forum.php?mod=viewthread&tid=26385&extra=page%3D1)

![](http://114.55.1.254/forum.php?mod=attachment&aid=MTUxOTJ8ZDQyYTE2ZmR8MTQ5NjMwNDc3M3wwfDI2Mzg1&nothumb=yes)

### 解决方法

设计表单时添加辅助CSS样式如下：

    table.LIST_VIEW{width:100%;}
    tr.LIST_VIEW_HEADER td{padding:10px 2px;}
    table.LIST_VIEW td input{padding:5px 2px;text-align:center;width:100%;}