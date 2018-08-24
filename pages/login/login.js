// pages/login/login.js
const app = getApp();
const domain = app.globalData.domain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userPwd: "",
    is_remember: false//是否记住密码
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  //获取用户输入的密码
  loginBtnClick: function (e) {
    if(!this.data.userName || !this.data.userPwd){
      wx.showToast({
        title: '请输入用户和密码',
        icon: 'none'
      })
      return;
    }
    var that = this;
    //提交
    wx.request({
      url: domain+"/api/weixin/login",
      method: "POST",
      data: {
        userName: JSON.stringify(this.data.userName),
        userPwd: JSON.stringify(this.data.userPwd)
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.code == 0) {
          //登录成功 - 后记住密码 

          if (that.data.is_remember){
            var setUserLoginInfo = [{ 'userName': that.data.userName, 'userPwd': that.data.userPwd }];
            //缓存
            wx.setStorage({
              key: "setUserLoginInfo",
              data: setUserLoginInfo,
              success: function(){
                
              }
            });
          }
         

          var userid = res.data.data.userid;
          //userid全局存储
          app.data.userid = userid;
          
          //跳转首页
          wx.reLaunch({
            url: '/pages/index/index'
          });
        }else{
          wx: wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
         
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var that = this; 
    var setUserLoginInfo = wx.getStorage({
      key: 'setUserLoginInfo',
      success: function(res) {
        that.setData({
          userName: res.data[0].userName,
          userPwd: res.data[0].userPwd,
          is_remember: true
        });
      },
      fail: function(res) {

        that.setData({
          userName: '',
          userPwd: '',
          is_remember: false
        });
      },
      complete: function(res) {},
    })
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
  
  },
  //记住密码
  rememberpwd: function(e){
    if (!this.data.userPwd || !this.data.userName)return;
    if (e.detail.value.length>0){//被选中
        this.setData({
          is_remember:true
        })
    }else{//未选中
      this.setData({
        is_remember: false
      })
    }
  }

})