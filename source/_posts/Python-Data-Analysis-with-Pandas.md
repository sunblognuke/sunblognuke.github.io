title: Python数据分析利器Pandas
date: 2018-06-07 10:23:58
categories: [Resources]
description:
tags: [Pandas,Python,Power Query]
---

Python逐渐成为数据分析的中流砥柱，而Pandas、Numpy更无疑是数据分析必备的利器工具，最近就尝试把之前在Power Query实现的工具转化让Python来完成，以此对比两者的优劣势，顺带温习Python3的某些特性。

## 辅助工具 jupyter notebook

jupyter notebook

## 数据清洗案例

    # 清洗数据 参照Power Query的思路
    import pandas as pd
    import numpy as np

    DATA_DIR = 'E:/加班计算助手/'
    df = pd.read_excel(DATA_DIR + 'Contact_sum.xlsx') #, usecols='A:G')

    # print(df.columns)
    # print(df.dtypes)

    df['年月']=df['年月'].astype(str) # 转化为字符类型
    df['年月'] = df['年月'].apply(lambda x:x[:-2]) # 清洗数据, 把float64类型比如"201709.0"转化为"201709"

    df_fixed = df.dropna(subset=['员工姓名', '员工编号'], how='any') # Define in which columns to look for missing values.

    # 逆透视除了['员工姓名', '员工编号']之外的列
    df_fixed = df_fixed.melt(id_vars=['员工编号','员工姓名','年月'],var_name='具体日期', value_name='加班小时')

    df_fixed = df_fixed.dropna(subset=['加班小时'], how='any') # 再次过滤【加班小时】为空或NAN的记录

    df_fixed['具体日期'] = df_fixed['具体日期'].astype(str)
    df_fixed['具体日期'] = df_fixed['年月'] + df_fixed['具体日期'].apply(lambda x:x.zfill(2)) # 合并形成具体时间格式的字段

    df_fixed['员工编号'] = df_fixed['员工编号'].astype(str)
    df_fixed['员工编号'] = df_fixed['员工编号'].apply(lambda x:x.zfill(6)) # 合并形成具体时间格式'20170901'的字段

    df_fixed = df_fixed.drop('年月',axis=1) # 删除指定列“年月”
    df_fixed = df_fixed.reset_index(drop=True) # 重置索引
    df_fixed


## 参考链接：

-- [xxx](http://xx.com)
