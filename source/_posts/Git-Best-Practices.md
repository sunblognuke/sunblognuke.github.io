title: Git最佳实践
date: 2015-12-22 08:31:58
categories: Dev
description:
tags: [Git, Workflow]
toc: false

---

![Git最佳实践](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/Git.png)

参考资源：

[图解Git/图形化的Git参考手册](http://blog.jobbole.com/22647/)
[Git分支管理策略](http://blog.jobbole.com/23398/)
[Git 分支管理是一门艺术](http://blog.jobbole.com/13916/)

1) $ git checkout -b myfeature develop
Switched to a new branch "myfeature"

2) $ git checkout develop
Switched to branch 'develop'

$ git merge --no-ff myfeature
Updating ea1b82a..05e9557
(Summary of changes)

$ git branch -d myfeature
Deleted branch myfeature (was 05e9557).

$ git push origin develop

3) $ git checkout master
Switched to branch 'master'

$ git merge --no-ff release-1.2
Merge made by recursive.
(Summary of changes)

$ git tag -a 1.2 -m 'comments here'
$ git push --tags

show all tags
$ git tag -n or git tag -n5
$ git show v5.0

git tag -d 12345
git push origin :refs/tags/12345

4) $ git commit -a -m "Bumped version number to 1.2.1"

5) Push only to a remote branch

   $ git checkout feature_x
   $ git push origin feature_x

With modern git you should be able to simply "git push origin HEAD", or even "git push HEAD" to push only currently checked-out branch

6) push and delete remote branches

$ git push origin :newfeature

7) shows all local and remote branches
$ git branch -a

shows only remote branches.
$ git branch -r

8) When "git unable to push to unqualified destination" occured, try to
Do "git fetch -p origin" to make refs/remotes/origin/my_remote_branch go away if it's already deleted in origin. The -p option tells fetch to delete any tracking branches that no longer exist in the corresponding remotes; by default they are kept around.

9) Fetch和Pull的简单区别如下：

git fetch是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。

而git pull 则是将远程主机的最新内容拉下来后直接合并，即：git pull = git fetch + git merge，这样可能会产生冲突，需要手动解决。

参考链接：[Git fetch & pull 详解](https://blog.csdn.net/qq_36113598/article/details/78906882)

10) Git分支管理策略，如图：

![](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/git_art.png)
