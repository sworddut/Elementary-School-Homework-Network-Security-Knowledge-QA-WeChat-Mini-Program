//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId\

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  // 获取数据的接口
  getData: function (api, callback) {
    const that = this
    wx.request({
      url: that.globalData.baseUrl + api,
      header: { sn: that.globalData.headerSn },
      method: "get",
      success: function (res) {

        callback(res)
      },
      fail: function () {
        callback('error')
      }
    })
  },

  // 修改数据接口
  putData: function (api, data, callback) {
    const that = this
    wx.request({
      url: that.globalData.baseUrl + api,
      header: {
        sn: that.globalData.headerSn,
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: data,
      method: "put",
      success: function (res) {
        callback(res)
      }
    })
  },

  // 提交数据
  postData: function (api, data, callback) {
    const that = this
    wx.request({
      url: that.globalData.baseUrl + api,
      method: "POST",
      data: data,
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded',
        'sn': that.globalData.headerSn
      },
      success: function (res) {
        callback(res)
      }
    })
  },

  // 获取用户信息
  getUserInfo: function () {
    const that = this
    this.getData("/api/user/self", function (res) {
      // console.log(res.data);
      that.globalData.userInfo = res.data
    })
  },

  globalData: {
    baseUrl: "http://127.0.0.1:5000",
    staticUrl: "https://static.lyxiang.xyz",
    userInfo: null,
    headerSn: "MDAxNzBiMDM3N2M3ZjBlMF80MTU3OTg3NjcwLzI0NTc=",
    score: 0,
    questionList: []
  }
})
