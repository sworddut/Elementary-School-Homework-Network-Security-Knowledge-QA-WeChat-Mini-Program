// pages/relogin/relogin.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticUrl: app.globalData.staticUrl,
  },
  goSign() {
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success:function(res){
        console.log(res.code)
        var data={code:res.code,gender:userData.gender,image:userData.avatarUrl,nickname:userData.nickName}
        console.log(data)
        app.postData('/user/login',data,function(res){
          console.log(123);
          app.globalData.headerSn = res.data.data.sn;
          console.log(res.data);
          console.log(app.globalData.headerSn)
      
          //获取积分等数据
          app.getData('/user/self',function(res){
            app.globalData.userInfo=res.data.data
            app.globalData.score=res.data.data.score
            console.log(res.data)

          })
        })
      }
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

  }
})