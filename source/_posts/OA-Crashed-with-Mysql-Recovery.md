title: 通达OA的MYSQL崩溃法启用
date: 2016-08-23 10:23:58
categories: [Resources]
description:
tags: [信息化,MYOA]
---

昨天公司UPS挂了导致服务器断电，重启以后通达OA的MYSQL服务再也无法启用。查询通达OA官方的文档，并根据log文件的错误提示最终把数据恢复回来，在此备忘记录一下。

## 修改innodb_buffer_pool_size

查找MySQL的错误日志文件（MYOA\data5\机器名.err）会记录如下类似内容：

    130409 15:54:31 [Note] Plugin 'FEDERATED' is disabled.
    130409 15:54:31 InnoDB: The InnoDB memory heap is disabled
    130409 15:54:31 InnoDB: Mutexes and rw_locks use Windows interlocked functions
    130409 15:54:31 InnoDB: Compressed tables use zlib 1.2.3
    130409 15:54:32 InnoDB: Initializing buffer pool, size = 1023.0M
    InnoDB: VirtualAlloc(1086849024 bytes) failed; Windows error 8
    130409 15:54:32 InnoDB: Completed initialization of buffer pool
    130409 15:54:32 InnoDB: Fatal error: cannot allocate memory for the buffer pool
    130409 15:54:32 [ERROR] Plugin 'InnoDB' init function returned error.
    130409 15:54:32 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
    130409 15:54:32 [ERROR] Unknown/unsupported storage engine: Innodb
    130409 15:54:32 [ERROR] Aborting

## 解决方法：

此情况出现的原因是myoa\mysql5\my.ini中innodb_buffer_pool_size的值太大，OA服务器操作系统不支持所致。改小后再启动mysql5_OA服务即可，恢复正常可以再改回原来的值。默认为1024M。

如果修改完innodb_buffer_pool_size依然运行不起来，查看log又出现如下类似内容：

    160822 19:14:38 [Note] Plugin 'FEDERATED' is disabled.
    160822 19:14:38 InnoDB: The InnoDB memory heap is disabled
    160822 19:14:38 InnoDB: Mutexes and rw_locks use Windows interlocked functions
    160822 19:14:38 InnoDB: Compressed tables use zlib 1.2.3
    160822 19:14:38 InnoDB: Initializing buffer pool, size = 299.0M
    160822 19:14:38 InnoDB: Completed initialization of buffer pool
    160822 19:14:38 InnoDB: highest supported file format is Barracuda.
    InnoDB: Log scan progressed past the checkpoint lsn 5772634979
    160822 19:14:38  InnoDB: Database was not shut down normally!
    InnoDB: Starting crash recovery.
    InnoDB: Reading tablespace information from the .ibd files...
    InnoDB: Restoring possible half-written data pages from the doublewrite
    InnoDB: buffer...
    InnoDB: Doing recovery: scanned up to log sequence number 5772636095
    160822 19:14:38  InnoDB: Starting an apply batch of log records to the database...
    InnoDB: Progress in percents: 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 

需要执行：

## 强制启动mysql服务 -》修改 innodb_force_recovery = 6

具体步骤参照官方文档：

1)打开\MYOA\mysql5\my.ini，去掉innodb_force_recovery=1前边的注释。

2)启动MySQL5_OA服务，此时MySQL处于只读状态，可以导出，不可写入。如果仍不能启动，可以尝试将innodb_force_recovery修改为2、3、4、5、6等，直到可以启动为止。（备注：一般情况下，3、4、6、7步骤可选及可省略）

3)使用MySQL管理工具比如Navicat for MySQL，将TD_OA等相关的数据库导出为SQL文件, 记得务必要保留创建表结构的导出结果。

4)停止MySQL5_OA服务，删除TD_OA下的所有文件、ibdata1、ib_logfile0、ib_logfile1等文件。

5）打开\MYOA\mysql5\my.ini，在innodb_force_recovery=1前边加上#号，将该项注释掉。

6)启动MySQL5_OA服务，然后导入此前备份的SQL文件。比如运行bin目录下的TDRecovery.exe，对数据库进行还原。

7)检查数据库，将无法通过该方法恢复的数据表，手动通过MySQL管理工具比如Navicat for MySQL把之前自动备份的单个SQL文件进行恢复。

## 参考链接：

-- [如何解决mysql5_OA服务不能启动的问题？](http://support.tongda2000.com/kb11019002/)
-- [通达OA服务器意外断电后数据库容易损坏的解决方案](http://blog.csdn.net/aliyunoa/article/details/50176715)
-- [Forcing InnoDB Recovery](http://dev.mysql.com/doc/refman/5.5/en/forcing-innodb-recovery.html)
