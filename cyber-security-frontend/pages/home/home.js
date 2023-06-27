// pages/home.js
const app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    staticUrl: app.globalData.staticUrl,
    userInfo: {},  // 服务器的用户数据
    score: 0,
    showModal: false,
  },

  hideModal: function () {
    this.setData({
      showModal: false
    })
  },
  
  signEveryDay: function() {
    const that=this
    app.postData('/user/checkin',{},function(res){
      console.log(res.data)
      //签到成功
      if(res.data.code==200) {
        //重新获取用户信息
        app.getData('/user/self',function(res){
          app.globalData.score=res.data.data.score
          if (res.data.code == 200) {
            that.setData({
              score:app.globalData.score,
              showModal:true
            })
          }
        })
      }
  })
},

  okBtn: function () {
    this.hideModal();
  },

  changeToTitlt:function(){
    wx.navigateTo({
      url: '../difficulty/difficulty',
    })
  },

  changeToRank:function(){
    wx.navigateTo({
      url: '../rank/rank',
    })
  },

  onLoad: function () {
    // const that=this
    // //获取用户自己的信息
    // app.getData('/user/self',function(res){
    //   if (res.data.code == 200) {
    //     app.globalData.userInfo=res.data.data
    //     app.globalData.score=res.data.data.score
    //     that.setData({
    //       userInfo: app.globalData.userInfo,
    //       score: app.globalData.score
    //     })
    //   } else if (res.data.code == 401) {
    //     wx.navigateTo({
    //       url: '../index/index',
    //     })
    //   }
    // })

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true,
    //     score:app.globalData.score
    //   })
    // }
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {

  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that=this
    //获取用户自己的信息
    app.getData('/user/self',function(res){
      if (res.data.code == 200) {
        app.globalData.userInfo=res.data.data
        app.globalData.score=res.data.data.score
        that.setData({
          userInfo: app.globalData.userInfo,
          score: app.globalData.score
        })
      } else if (res.data.code == 401) {
        wx.navigateTo({
          url: '../index/index',
        })
      }
    })

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