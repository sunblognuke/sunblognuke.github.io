title: 清理DNN数据库
date: 2019-07-15 14:23:58
categories: Dev
description:
tags: [DNN, CMS]
---

DNN这一平台使用数据库的是SQL server, 随着时间的推移，其容量逐渐递增，特别的如果系统出现一些异常情况，包括模块出错等，则更让数据库文件的体积增加得更为迅速。故此隔段时间，网站管理员有必要巡查监视下，如有必要则做清理动作。

## 检查db所有数据库表的使用状况

	-- For storing values in the cursor
	DECLARE @TableName VARCHAR(100);
		
	   -- Cursor to get the name of all user tables from the sysobjects listing
	   DECLARE [tableCursor] CURSOR FOR 
		SELECT [name]
		FROM [dbo].[sysobjects] 
		WHERE OBJECTPROPERTY([id], N'IsUserTable') = 1
	   FOR READ ONLY;
		
	   -- A procedure level temp table to store the results
	   CREATE TABLE #TempTable (
		   [tableName] VARCHAR(100),
		  [numberofRows] VARCHAR(100),
		   [reservedSize] VARCHAR(50),
		   [dataSize] VARCHAR(50),
		   [indexSize] VARCHAR(50),
		   [unusedSize] VARCHAR(50)
	   );
	   
	-- Open the cursor
	OPEN [tableCursor];
		
	-- Get the first table name from the cursor
	FETCH NEXT FROM [tableCursor] INTO @TableName;
	-- Loop until the cursor was not able to fetch
	WHILE (@@Fetch_Status >= 0)
	 BEGIN
		 -- Dump the results of the sp_spaceused query to the temp table
		  INSERT  #TempTable
			  EXEC sp_spaceused @TableName;
	   
		  -- Get the next table name
		 FETCH NEXT FROM [tableCursor] INTO @TableName;
	   END
	  
	 -- Get rid of the cursor
	 CLOSE [tableCursor];
	 DEALLOCATE [tableCursor];
		
	-- remove the text so we can convert the columns
	UPDATE #TempTable 
	SET [reservedSize] = REPLACE([reservedSize], N' KB', N''), 
		[dataSize] = REPLACE([dataSize], N' KB', N''), 
		[indexSize] = REPLACE([indexSize], N' KB', N''), 
		[unusedSize] = REPLACE([unusedSize], N' KB', N''); 
	   
	  -- convert the columns to INT so they will sort properly
	  ALTER TABLE #TempTable ALTER COLUMN [reservedSize] INT NULL;
	  ALTER TABLE #TempTable ALTER COLUMN [dataSize] INT NULL;
	  ALTER TABLE #TempTable ALTER COLUMN [indexSize] INT NULL;
	  ALTER TABLE #TempTable ALTER COLUMN [unusedSize] INT NULL;
		
	  -- Select all records so we can use the reults
	  SELECT * 
	  FROM #TempTable 
	  ORDER BY [dataSize] DESC, [reservedSize] DESC, [indexSize] DESC, [unusedSize] DESC;
	  
	-- Final cleanup!
	DROP TABLE #TempTable;

## 清理数据库占用空间最大的TOP 3

	/* TOP 3 with big TableSize*/
	TRUNCATE TABLE [dbo].[sitelog];
	TRUNCATE TABLE [dbo].[ScheduleHistory];
	DELETE FROM [dbo].[EventLog];


