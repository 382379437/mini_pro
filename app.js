//app.js
App({
  data:{
    userid: 0
  },
  globalData: {
    domain: 'http://www.game.com'//你的api域名
  },
  isLogin: function(){
    if(this.data.userid)
    return true;
    else
    return false;
  },
  /*获取当前页url*/
  getCurrentPageUrl:function (){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    return url
  },
  /*获取当前页带参数的url*/
  getCurrentPageUrlWithArgs: function (){
      var pages = getCurrentPages()    //获取加载的页面
      var currentPage = pages[pages.length - 1]    //获取当前页面的对象
      var url = currentPage.route    //当前页面url
      var options = currentPage.options    //如果要获取url中所带的参数可以查看options

      //拼接url的参数
      var urlWithArgs = url + '?'
      for(var key in options){
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
      }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

    return urlWithArgs
  }
})