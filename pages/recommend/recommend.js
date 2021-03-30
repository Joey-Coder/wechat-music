// pages/recommend/recommend.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month: '1',
    day: '1',
    recommendSongs: []
  },

  /**
   * 获取当前日期
   */
  getDate() {
    let date = new Date()
    let month = date.getMonth() + 1
    let day = date.getDate()
    this.setData({
      month,
      day
    })
  },

  async getRecommendSongs() {
    let { code, recommend } = await request(
      '/recommend/songs',
      {},
      'GET',
      { requireLogin: true }
    )
    console.log(code)
    if (code == 200) {
      this.setData({
        recommendSongs: recommend
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDate()
    this.getRecommendSongs()
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