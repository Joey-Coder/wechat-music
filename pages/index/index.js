// pages/index/index.js

import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: {},
    recommend: {}
  },

  /**
   * 获取海报封面
   */
  async getBanners() {
    const { banners, code } = await request(
      '/banner',
      {
        type: 1
      },
      'GET'
    )
    if (code === 200) {
      console.log('获取封面海报成功')
      this.setData({
        banners: banners
      })
    }
  },

  async getRecommend() {
    const { code, result } = await request(
      '/personalized',
      { limit: 10 },
      'GET'
    )
    if (code === 200) {
      console.log('获取推荐歌单成功')
      this.setData({
        recommend: result
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求banners
    this.getBanners()
    // 请求推荐歌单
    this.getRecommend()

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