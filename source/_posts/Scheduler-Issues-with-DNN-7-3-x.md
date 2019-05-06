title: Scheduler Issues with DNN 7.3.x
date: 2016-08-12 18:49:18
categories: [Dev]
description:
tags: [DNN, Troubleshooting]
---

# Issue Detail

Lot of logs in Event Viewer related with "Scheduler Exception -Sequence contains more than one matching element". This occurs when there is a duplicate entry in the WebServers table.

# Solution

 To verify if this is the issue, go to Host > SQL and run the following SQL query:

    SELECT ServerName FROM {databaseOwner}[{objectQualifier}WebServers]

If you see the same entry more than once, you need to run the following SQL query: 

    DELETE FROM {databaseOwner}[{objectQualifier}WebServers]

Once that has been completed, hover over Tools->Recycle Application Domain to make it work with re-indexing.

# Referrence

[Scheduler Issues in DNN 7.3.x](https://support.managed.com/kb/a2170/scheduler-issues-in-dnn-7_3_x.aspx)

[Scheduler exception after Upgrade to 7.3.0 ](http://www.dnnsoftware.com/forums/threadid/502348/scope/posts/scheduler-exception-after-upgrade-to-730)

[DNN 7.3.1 SCHEDULER EXCEPTION](http://www.dnnsoftware.com/answers/dnn-731-scheduler-exception)

