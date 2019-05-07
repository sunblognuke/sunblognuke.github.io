/** 
* page_title helper
*
* Usage:
*   <head>
*     <title><%= page_title() %></title>
*   </head>
*/

hexo.extend.helper.register("page_title", function () {
  var title = this.page.title;

  if (this.is_archive()){
    title = this.__('archive_a');

    if (this.is_month()){
      title += ': ' + this.page.year + '/' + this.page.month;
    } else if (this.is_year()){
      title += ': ' + this.page.year;
    }
  } else if (this.is_category()){
    title =  this.__('categories')+' : ' + this.page.category;
  } else if (this.is_tag()){
    title = this.__('tags')+' : ' + this.page.tag;
  }

  return title;
});