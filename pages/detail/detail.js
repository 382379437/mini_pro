// pages/detail/detail.js
const app = getApp();
const domain = app.globalData.domain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    dataid:0,
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //验证登录
    if (!app.isLogin()) {
      wx.reLaunch({
        url: '/pages/login/login',
      });
    }
    //根据传过来得dataid 查询数据并赋值给 info
    var dataid = 0;
    var type = 'player';//默认获取用户数据【即跳转到我的】
    //================获取跳转参数================开始
    if (!options.dataid){
      //从全局获取
      dataid = app.data.userid;
    }
    else{
      //有参数，从参数获取
      dataid = options.dataid;
      type = options.type;
    }
    //================获取跳转参数================结束
    this.setData({
      dataid: dataid,
      type: type
    });

    var that = this;
    //查询数据
    wx.request({
      url: domain + "/api/weixin/getDetail",
      method: "GET",
      data: {
        type: this.data.type,//查询类型
        dataid: that.data.dataid//数据id
      },
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function (res) {
        var info = res.data.data;

        if (res.data.code) {
          //设置当前页面数据
          that.setData({
            info: info
          });
        } else {
          wx.reLaunch({
            url: app.getCurrentPageUrl(),
          })
        }
      },
      fail: function (r) {
        
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})