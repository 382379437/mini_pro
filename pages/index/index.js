//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    nowMenu: 1,
    sunMenu: [
      [
        { 'title': '俱乐部列表', 'url': '/pages/list/list?type=club', 'openbox': 0}
      ],
      [
        { 'title': '玩家列表', 'url': '/pages/list/list?type=player', 'openbox': 0}
      ],
      [
        { 'title': '游戏中房间', 'url': '/pages/list/list?type=playing', 'openbox': 0},
        { 'title': '所有房间', 'url': '/pages/list/list?type=allroom', 'openbox': 0},
        { 'title': '战绩信息', 'url': '/pages/list/list?type=grade', 'openbox': 0},
        { 'title': '玩家开局', 'url': '/pages/list/list?type=open', 'openbox': 0},
      ],
      [
        { 'title': '开局统计', 'url': '', 'openbox': 1, 'menus': 
          [
            { 'title': '今日', 'url': '/pages/list/list?type=opencount&group=tab1'},
            { 'title': '近7日', 'url': '/pages/list/list?type=opencount&group=tab2'},
            { 'title': '近30日', 'url': '/pages/list/list?type=opencount&group=tab3'},
          ]
        },
        {
          'title': '玩家对局统计', 'url': '/pages/list/list?type=playercount', 'openbox': 1, 'menus':
            [
              { 'title': '今日', 'url': '/pages/list/list?type=playercount&group=tab1'},
              { 'title': '近7日', 'url': '/pages/list/list?type=playercount&group=tab2'},
              { 'title': '近30日', 'url': '/pages/list/list?type=playercount&group=tab3'},
            ]
        },
        {
          'title': '俱乐部对局统计', 'url': '/pages/list/list?type=clubcount', 'openbox': 1, 'menus':
            [
              { 'title': '今日', 'url': '/pages/list/list?type=clubcount&group=tab1'},
              { 'title': '近7日', 'url': '/pages/list/list?type=clubcount&group=tab2'},
              { 'title': '近30日', 'url': '/pages/list/list?type=clubcount&group=tab3'},
            ]
        }
      ],
      [
        { 'title': '钻石记录', 'url': '/pages/list/list?type=gems', 'openbox': 0}
      ],
      [
        { 'title': '订单管理', 'url': '/pages/list/list?type=order', 'openbox': 0}
      ]
    ]
  },
  onLoad: function () {
    //验证登录
    if (!app.isLogin()) {
      wx.reLaunch({
        url: '/pages/login/login',
      });
    }
    this.setData({
      nowMenu: this.data.sunMenu[0]
    }); 
  },
  //子菜单开关
  spread: function(e){
    var n = e.currentTarget.dataset.num;

    this.setData({
      nowMenu: this.data.sunMenu[n]
    }); 


  },
  //跳转页面
  toJump: function (e) {
    //获取弹出框的打开状态 1 弹出， 0不弹出-直接跳转页面
    var openbox = e.currentTarget.dataset.openbox;
    if (openbox == 1) {
      var m = this.data.nowMenu;
      var num = e.currentTarget.dataset.num;
      
      //弹框展示的数据
      var ms = m[num].menus;//保存被点击菜单的子菜单
      var ilist = [];
      for (var i = 0; i < ms.length; i++){

        //组装弹出框数据
        ilist.push(ms[i].title);
      }

      //点击显示模态弹出框
      wx.showActionSheet({
        itemList: ilist,
        success: function (res) {
          //获取跳转链接
          var url = ms[res.tapIndex].url;

          //跳转到list页面
          wx.navigateTo({
            url: url
          });
        },
        fail: function (res) {
          
        }
      })
    }else{
      //跳转
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
          group: this.data.group
        });
    }
   
  }
})
