title: 通达OA 2015升级注意事项
date: 2017-05-13 10:23:58
categories: [Resources]
description:
tags: [信息化,通达OA,MYOA]
---

通达OA 2017已发布升级版本，公司有意向想升级到最新版本。故此在临时服务器上搭建测试环境。过程中碰到如下问题，记录并包括解决方案：

1. 停止OA所有服务并退出Monitor.exe.
2. 拷贝MYOA根目录下的大部分文件夹，可除去bak, attach等目录（这些文件都很大，可升级后慢慢迁移）。
3. 双机bin目录下的autoconfig.exe配置新环境。

## office_redis服务不能启动

### 可能原因：

1、进行过替换bin目录的操作，替换前后两个bin目录对应的OA的安装路径不一致导致的。

2、myoa\attach下缺少redis_data目录或redis_data\heap目录或redis_data目录下的aof文件损坏导致。

### 解决方法：

1、记事本打开myoa\bin\redis.windows.conf，按盘符搜索，修改以下几处对应的路径：

1）logfile D:/MYOA/logs/redis.log

2）dir D:/MYOA/attach/redis_data

3）heapdir D:/MYOA/attach/redis_data/heap

2、从备份的myoa\attach中拷贝redis_data目录恢复或者把缺失的目录手动创建上，若目录都在，属于aof文件损坏导致，则将该文件重命名一下，再重启服务即可。

我们的问题就是缺失attach目录，故此我们新建并补齐这一目录即可把office_redis服务正常运行起来。

## Office_Web服务不能启动

从log日志显示2367端口被占用：服务启动失败, 侦听线程创建不成功,端口 2367 被占用。

### 解决方法：

打开OA的MYSQL数据执行语句：

    update sys_para set PARA_VALUE='2368' where PARA_NAME= 'WEB_SVC_PORT';

改一下端口2368或其他端口直到可以运行为止。

## 参考链接：

-- [如何解决office_redis服务不能启动的问题？](http://support.tongda2000.com/kb11019070/)
-- [Office_Web服务启动不了，log日志显示2367端口被占用？](http://club.tongda2000.com/forum.php?mod=viewthread&tid=26282)

## 批量更新用户权限

禁止OA登录，禁止手机登录，禁止使用即时通讯（资源有限）：

    UPDATE user SET NOT_LOGIN=1, NOT_MOBILE_LOGIN=1, IM_RANGE=2 WHERE DEPT_ID=0
