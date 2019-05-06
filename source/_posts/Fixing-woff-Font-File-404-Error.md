title: Fixing .woff Font File 404 Error
date: 2016-07-24 09:58:52
categories: [Dev]
description:
tags: [DNN, Bootstrap]
---

# What is exactly the 404 issue?

When using the Bootstrap iconic font and CSS toolkit, such as Glyphicons or [Font Awesome](http://fontawesome.io), the font comes in a lot of flavors, including .ttf and woff. Somehow it seems that IIS will return a 404 not found when requesting the .woff file – even though the file definitely exists and the URL is correct.

# Recommended Solution

The solution for this is to add the following segment to the WebServer section of your web.config:

      <staticContent>
          <!-- Fix issue about loading woff font failure -->
          <remove fileExtension=".woff" />
          <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
          <remove fileExtension=".woff2" />
          <mimeMap fileExtension=".woff2" mimeType="font/x-woff" />
      </staticContent>

This configures IIS to understand that there is a woff mime type that it should care about, which magically makes the 404 go away.

You can add a remove node before adding the new mimeMap as the above coding to avoid a duplicate mime type error in case they are already there.

# Alternative solution

If you don’t want to add this to the web.config, you can also configure the IIS server in the UI.

Just double-click the "MIME Types" configuration option while having IIS root node selected in the left panel and click "Add..." link in the Actions panel on the right. This will bring up the following dialog. Add .woff file extension and specify "application/x-font-woff" as the corresponding MIME type:

Add MIME Type for .woff file name extension:

![Add MIME Type for .woff file name extension](https://raw.githubusercontent.com/sunblognuke/resources/master/hexo/404Errors.gif)

This will force IIS to process .woff files correctly and will fix 404 errors associated with these files.

## resources links:

[Why is @font-face throwing a 404 error on woff files?](http://stackoverflow.com/questions/4015816/why-is-font-face-throwing-a-404-error-on-woff-files)

[404 errors in IIS7 for embedded .woff font files](http://www.dirigodev.com/blog/web-development-execution/404-errors-in-iis7-for-embedded-woff-font-files/)
