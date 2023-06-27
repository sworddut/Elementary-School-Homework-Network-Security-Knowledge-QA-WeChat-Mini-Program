//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    staticUrl: app.globalData.staticUrl,
    background: '../../images/index_bg.png',
    index_logo: '../../images/index_logo.png',
    motto: 'Hello World',
    userInfo: {},  // 从微信获取的用户信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../home/home'
    })
  },

  onLoad: function () {
    // 检查有没有用户信息
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    var userInfo = e.detail.userInfo
    this.setData({
      userInfo,
      hasUserInfo: true
    })

    wx.login({
      success:function(res){
        var data = {
          nickname: userInfo.nickName,
          gender: userInfo.gender,
          image: userInfo.avatarUrl,
          code: res.code,
        }
        app.postData('/user/login',data,function(res){
          if (res.data.code == 200) {
            app.globalData.headerSn = res.data.data.sn;
            wx.reLaunch({
              url: '/pages/home/home',
            })
          }
        })
      }
    })
  },

  goSign() {
    wx.reLaunch({
      url: '/pages/home/home',
    })
  }
})
