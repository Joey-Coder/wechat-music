// pages/index/index.js

import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 海报
    banners: {},
    // 推荐
    recommend: {},
    // 排行榜
    topList: []
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

  async getTopList() {
    let list = []
    for (let i = 0; i < 5; i++) {
      const { code, playlist } = await request(
        '/top/list',
        { idx: i },
        'GET'
      )
      if (code === 200) {
        console.log(`获取排行榜${i}成功`)
        let temp = {
          name: playlist.name,
          songs: playlist.tracks.slice(0, 3)
        }
        list.push(temp)
        this.setData({
          topList: list
        })
      }
      else {
        console.log('获取排行榜失败')
      }
      // this.data.topList.push(temp)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求推荐歌单
    this.getRecommend()
    // 请求banners
    this.getBanners()
    // 请求排行榜
    this.getTopList()

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