// pages/list/list.js

const app = getApp();
const domain = app.globalData.domain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'club',
    info_list: [],
    group:'tab1',//统计时，选择标签区分
    searchParam: '',//搜索框输入的数据
    searchParamArrKey: [],//下拉框数据key
    searchParamArrTitle: [],//下拉框数据val
    index:0,
    //以下是排序参数
    orderKey:[],//排序key
    orderTitle:[],//排序标题
    orderIndex: 0,//排序下标值
    //排序方式
    orderMethodKey: [],//排序key
    orderMethodTitle: [],//排序标题
    orderMethodIndex: 0,//排序下标值
    //以下是分页数据
    page:0,//当前页码
    last_page:1,//总共页数
    total:10,//总条数
    perPage:10,//每页数
    // 控件
    btn_arr: '',
    btn_url: '',
    //弹框参数
    hiddenmodalput: true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    //弹框输入
    modalsaveinputinfo:'',
    topkid: 0,//列表被点击的主键id to pk id 目标主键
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
    var t = options.type ? options.type :'club';
    var group = options.group ? options.group:'tab1';
    //设置业务数据并传输到视图
    this.setData({
      type: t,
      group: group
    });
    //查询数据
    this.getdata();
    

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
  ,
  todetail: function(e){

    var dataid = e.target.dataset.id;//获取被点击的数据id
    var type = this.data.type;//请求类型
    wx.navigateTo({
      url: '/pages/detail/detail?dataid=' + dataid + '&type=' + type
    });

  },
  toseach: function(e){
 
    //请求数据
    this.getdata();

    
  },
  //输入事件
  saveSearchParam: function(e){
    this.setData({
      searchParam:e.detail.value
    });

  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      orderIndex: e.detail.value
    })
  },
  bindPickerChange3: function (e) {
    this.setData({
      orderMethodIndex: e.detail.value
    })
  },
  getdata: function () {
    var that = this;
    var p = that.data.page;
    wx.request({
      url: domain + "/api/weixin/getdata",
      method: "GET",
      data: {
        type: this.data.type,
        group: this.data.group,
        search: this.data.searchParam,
        field: this.data.searchParamArrKey.length>0?this.data.searchParamArrKey[this.data.index]:'',
        orderField: this.data.orderKey.length > 0?this.data.orderKey[this.data.orderIndex]:'',
        orderMethod: this.data.orderMethodKey.length > 0?this.data.orderMethodKey[this.data.orderMethodIndex]:'',
        page: p,//当前页码
      },
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function (res) {
        
        if (res.data.code) {
          var d = res.data.data;
          
          if (d.data.length==0){
            wx.showToast({
              title: '没有相关数据',
            });
            return;
          }
          var info_list = d.data;//数据二维数组

          //设置当前页面全局数据
          that.setData({
            info_list: info_list,
            searchParamArrKey: info_list[0].search_field_val,//保存搜索区下拉框参数
            searchParamArrTitle: info_list[0].search_field_key,
            orderKey: info_list[0].order_val, //保存排序参数
            orderTitle: info_list[0].order_key, //保存排序参数
            orderMethodKey: info_list[0].order_method_val,//排序方式
            orderMethodTitle: info_list[0].order_method_key,//排序方式
            // 保存分页数据
            page: res.data.data.current_page,//当前页
            last_page: res.data.data.last_page,
            total: res.data.data.total,
            perPage: res.data.data.per_page,
            btn_arr: info_list[0].btn_arr,
            btn_url: info_list[0].btn_url,
          });

        } else {
         
        }
      },
      fail: function (r) {
        
      }
    });
  },
  //下
  getDataDown: function (e) {
    var p = this.data.page;
    if (p < this.data.last_page) {
      p = p + 1;
    }else{
      return;//上下限控制
    }
    this.setData({
      page: p
    });
  
    this.getdata();
  },
  //上
  getDataUp: function(e){
    var p = this.data.page;
    if (p > 1){
      p = p-1;
    }else{
      return;//上下限控制
    }
    this.setData({
      page: p
    });
 
    this.getdata();
  },
  //请求充卡
  toCharge: function (num) {
    var that = this;
    var url = this.data.btn_url;
    if (!url || !num)return;
    
    wx.request({
      url: domain + url,
      method: "GET",
      data: {
        num: num,//充值数量
        uid: app.data.userid,
        topkid: that.data.topkid
      },
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function (res) {
        //充值结果提示
        wx.showToast({
          title: res.data.msg
        });
      },
      fail: function (r) {
        
      }
    });
  },
  //点击按钮弹出指定的hiddenmodalput弹出框
	modalinput: function (e) {
    
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      topkid: e.target.dataset.topkid
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      modalsaveinputinfo:'',//重置
    });
  },
  //确认
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    });
    var inp = this.data.modalsaveinputinfo;
    if (!/^\d*$/.test(inp)){
      wx.showToast({
        title: '请输入充卡数量',
      });
      this.setData({
        modalsaveinputinfo: ''//重置
      })
      return;
    }
    //验证通过

    this.toCharge(inp);

  },
  //弹出框输入
  modalsaveinputinfo: function(e){
    this.setData({
      modalsaveinputinfo: e.detail.value
    })
  }
})