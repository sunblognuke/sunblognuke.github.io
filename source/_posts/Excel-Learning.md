title: Excel知识点集锦
date: 2017-08-31 08:23:58
categories: [Resources]
description:
tags: [信息化,BI,Office]
---

## 消除关联动态查询警告

如果在PQ查询中遇到

>Formula.Firewall: 查询"xx"(步骤"xx") 将引用其他查询或步骤，因此可能不会直接访问数据源。请重新生成此数据组合。

这样的问题，那是文件的隐私设置级别的原因：

![查询警告](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/bi01.png)

如此这般设置即可。

![隐私设置](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/bi02.png)

## 补齐位数
在做数据处理的时候经常要把表格内的数字处理XX位的一组数字。但是原始数据的位数不够则需要使用0来补充。手输是不可能的，使用自动补零的方法应该不错。

### 步骤或方法

1. 选择你要补零的单元格点右键再选择进入设置单元格格式。
2. 进入设置单元格格式的界面，在数字选项下点击自定义，类型中找到G/通用格式，然后在上面的方框内输入你要多少位置补零就输入多少个零，最后点击确定。

__参考链接：__[excel表格位数不够自动补0的方法](https://jingyan.baidu.com/article/c843ea0b7d267177921e4a4b.html)

## PowerQuery动态汇总文件夹下的多个Excel文件

__参考链接：__

[用PowerQuery动态汇总文件夹下的多个Excel文件（支持动态增删自动更新）](https://zhuanlan.zhihu.com/p/26164792)

[如何使用Power Query动态汇总文件夹下多个Excel文件](http://news.51cto.com/art/201612/524241.htm)

## PowerQuery 补齐位数

比如编号或月份默认是1，而你需要的显示是类似"01"效果。

### 步骤或方法

新增一自定义列([Month]为原始列)，套用以下公式即可:

    Text.PadStart(Text.From([Month]),2,"0")

## PowerQuery 分组合并同类项

比如某一列"课程"可能是"初级班"、"中级班"、"高级班"，而我们需要分组合并看看总共都参与了哪些班，最终的结果可能类似于"初级班、中级班、高级班"。

### 步骤或方法

分组并求和"课程"这一列，无疑应该是报错。修改函数，将分组操作生成公式中的

    List.Sum([课程])
修改为

    Text.Combine([课程], "、")

另外一种方法：

[Group or Summarize Data in Excel with Power Query](https://www.powerquery.training/portfolio/group-summarize-data/)
