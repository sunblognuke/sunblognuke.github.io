title: 如何重设DNN用户密码
date: 2015-12-14 11:18:38
categories: Dev
description:
tags: [DotNetNuke]

---

![](http://7xof1d.com1.z0.glb.clouddn.com/img/password.jpg?imageView2/2/w/680/q/90)

在当今信息时代，管理密码本是一件很费时费力的事情。相对于DNN这一平台，由于版本较多不可避免地在开发过程中会搭建好多本地站点，时不时忘记密码也是常有的事。

## 超级用户

### 终极方案

**前提：**有权限操作数据库db。

**原理：**把aspnet_membership表中的"XX_UserName"用户的password和password_salt值拷贝并覆盖host用户对应的值。

在SQL Management Studio执行如下Query SQL script：

    /*
     -- Database Utility ---------------------------------------------------------------------------
     Description : Reset a Password in a DotNetNuke database
     Author : Tony Tullemans
     Date Created : 18.04.2007
     Note/s : Before you run this script you must know the UserName and Password of another
     registered DNN user in the database you wish to affect.
     -----------------------------------------------------------------------------------------------
     */
     
    DECLARE @databaseName VARCHAR(128)
    SELECT @databaseName = DB_NAME()
     
    PRINT 'RESET PASSWORD IN DATABASE : ' + @databaseName
    PRINT '-----------------------------' + REPLICATE('-', DATALENGTH(@databaseName ));
     
    DECLARE @knownUserName NVARCHAR(128)
    DECLARE @lostUserName NVARCHAR(128)
    DECLARE @lostUserId NVARCHAR(128)
    DECLARE @knownPassword NVARCHAR(128)
    DECLARE @knownSalt NVARCHAR(128)
     
    SET @knownUserName = 'windy' /* WHAT YOU NEED TO MODIFY */
    SET @lostUserName = 'host'
     
    SELECT @knownPassword = Password, @knownSalt = PasswordSalt
    FROM aspnet_Membership
    INNER JOIN aspnet_users
    ON aspnet_Membership.UserId = aspnet_users.UserId
    where UserName = @knownUserName;
     
    PRINT ''
    PRINT 'Known Password for "' + @knownUserName + '" is : ' + @knownPassword
    PRINT 'Known Password Salt for "' + @knownUserName + '" is : ' + @knownSalt
     
    SELECT @lostUserId = aspnet_Membership.UserId
    FROM aspnet_Membership
    INNER JOIN aspnet_users
    ON aspnet_Membership.UserId = aspnet_users.UserId
    WHERE UserName = @lostUserName;
     
    PRINT ''
    PRINT 'UserID for "' + @lostUserName + '" is : ' + @lostUserId
    PRINT ''
     
    IF (DATALENGTH(@lostUserName) <= 0 OR @lostUserName IS NULL)
    PRINT 'Invalid Lost User Name ' + @lostUserName
    ELSE BEGIN
    IF (DATALENGTH(@knownUserName) <= 0 OR @knownUserName IS NULL)
    PRINT 'Invalid Lost User Name ' + @lostUserName
    ELSE BEGIN
    IF (DATALENGTH(@knownPassword) <= 0 OR @knownPassword IS NULL)
    PRINT 'Invalid Known Password ' + @knownPassword
    ELSE BEGIN
    IF (DATALENGTH(@knownSalt) <= 0 OR @knownSalt IS NULL)
    PRINT 'Invalid Known Salt ' + @knownSalt
    ELSE BEGIN
    PRINT ''
    PRINT 'BEFORE'
    SELECT left(UserName, 12) as UserName, aspnet_Membership.UserId, left(Email, 20) as Email, Password, PasswordSalt
    FROM aspnet_Membership INNER JOIN aspnet_users ON aspnet_Membership.UserId = aspnet_users.UserId
    WHERE UserName IN ( @knownUserName, @lostUserName );
    PRINT ''
    PRINT 'Changing Password for User Id("' + @lostUserId + '") to: "' + @knownPassword + '"'
    PRINT ''
    UPDATE aspnet_Membership
    SET Password = @knownPassword,
    PasswordSalt = @knownSalt
    -- SELECT UserId, Password, PasswordSalt
    -- FROM aspnet_Membership
    WHERE UserId = @lostUserId;
    PRINT ''
    PRINT 'AFTER'
    SELECT left(UserName, 12) as UserName, aspnet_Membership.UserId, left(Email, 20) as Email, Password, PasswordSalt
    FROM aspnet_Membership INNER JOIN aspnet_users ON aspnet_Membership.UserId = aspnet_users.UserId
    WHERE UserName IN ( @knownUserName, @lostUserName );
    END
    END
    END
    END
    GO

    PRINT ''
    PRINT ' * * * END OF SCRIPT * * *'
    PRINT ''
    GO

### 手动模式

**前提：**开放注册功能和有权限操作数据库db。
**原理：**创建新用户并手动到数据库，在表ASPNet_Membership查询出host和新用户的记录，把新用户的password和password_salt值拷贝并覆盖host用户对应相同的列上。

As there are frequent requests from users, who lost the password of the host account (and you cannot request the host password by email), the following solution will help for all DNN 3 and 4 installation. Please note, that your need direct access to the database to suceed with the issue:

1. if "register" is not displayed for the portal, go to table "Portals"  in your database and enter value "2" into column "Registration".
2. create a new user account by registration (this time, please remember the password you enter!)
3. go to database, enter table "ASPNet_Membership"
4. go to new user account (usually the last one) and copy the encrypted values of columns "Password" and "PasswordSalt" into the same columns of user account "host" (usually th first entry in this table) 
5. login as user "host" using the new password and delete the reshly created other user.

Keep remembering your password ;)

### 代码模式（不推荐使用）

**前提：**有权限访问FTP。
**原理：**调用核心API获取Host用户输出到页面。
**缺点：** 加密方式为Hashed不可用；操作完成务必删除。

    <%@ Page Language="C#" %>
    <script runat="server">
        void Page_Load(object sender, System.EventArgs e)
        {
            DotNetNuke.Entities.Users.UserInfo uInfo = 
    DotNetNuke.Entities.Users.UserController.GetUserById(0, 1);
            if (uInfo != null)
            {
                string password = 
    DotNetNuke.Entities.Users.UserController.GetPassword(ref uInfo, String.Empty);
                Response.Write("Password: " + password);
            }
            else
            {
                Response.Write("UserInfo object is null");
            }
        }
    </script>
    <html>
        <head>
            <title>Recover Password</title>
        </head>
        <body>
        </body>
    </html>

## 普通用户

### 核心方案

通过注册模块点击重设密码链接获取邮件提醒。

[DNN Wiki - Recover Passwords](http://www.dnnsoftware.com/wiki/recover-passwords)

### 第三方模块

[IowaComputerGurus's Secure Password Recovery module](https://dnnsecurepasswordrec.codeplex.com/)

