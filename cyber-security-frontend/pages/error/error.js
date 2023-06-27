// pages/error/error.js
const app = getApp()
var questions, question, length
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticUrl: app.globalData.staticUrl,
    questionList: [],
    item: 0,
    question: {},
    length: 0,

    //questionId:0,
    //type: 0,
    showModal: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    this.data.questionList = app.globalData.questionList.questionList
    console.log(this.data.questionList)
    if (this.data.questionList) {
      var question = this.data.questionList[this.data.item]
      length = this.data.questionList.length
      console.log(length)
      this.setData({
        question,
        length,
        // questionId: question.questionId,
        // type: question.type,
      })
      console.log(this.data.length)
    }
  },

  changetohome: function () {
    wx.reLaunch({
      url: '../home/home',
    })

  },

  hideModal: function () {
    this.setData({
      showModal: 0
    })
  },
  /**
   * 对话框取消按钮点击事件
   */

  okBtn: function () {
    this.hideModal()
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