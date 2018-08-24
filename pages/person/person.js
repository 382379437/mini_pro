// pages/person/person.js
const app = getApp();
const domain = app.globalData.domain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //验证登录
    if (!app.isLogin()){
      wx.reLaunch({
        url: '/pages/login/login',
      });
      return;
    }
    var that = this;
    //查询数据
    wx.request({
      url: domain + "/api/weixin/getDetail",
      method: "GET",
      data: {
        type: 'player',//查询类型
        dataid: app.data.userid//数据id
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