// pages/personal/personal.js
var startY = 0
var moveY = 0
var moveDistance = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    translateY: "translateY(0)",
    transition: 'all 1s linear',
    userInfo: {}
  },

  // 获取鼠标点击时的坐标
  handleTouchStart(event) {
    this.setData({
      transition: ''
    })
    startY = event.touches[0].clientY
    // console.log(startY)
  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY
    console.log(moveDistance)
    if (moveDistance < 0) {
      moveDistance = 0
    }
    if (moveDistance > 80) {
      moveDistance = 80
    }
    this.setData({
      translateY: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd() {
    this.setData({
      transition: 'all 1s linear',
      translateY: 'translate(0)'
    })
  },
  // 点击跳转到登录页面
  handleLogin() {
    if (!this.data.userInfo.nickname) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo.nickname) {
      this.setData({
        userInfo: userInfo
      })
    }
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