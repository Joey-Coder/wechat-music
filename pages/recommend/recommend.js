// pages/recommend/recommend.js
import request from '../../utils/request.js'
import PubSub from 'pubsub-js'
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
    // console.log(code)
    if (code == 200) {
      this.setData({
        recommendSongs: recommend
      })
    }
  },

  /**
   * 跳转到播放详情页面
   */
  toSongDetail(e) {
    let { index, id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/songDetail/songDetail?id=${id}&index=${index}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDate()
    this.getRecommendSongs()
    // 订阅detail页面的切歌事件
    var switchSong = PubSub.subscribe('switchSong', (msg, data) => {
      // console.log(msg, data)
      let { recommendSongs } = this.data
      let len = recommendSongs.length
      let { type, index } = data
      if (type === 'next') {
        index = (index + len + 1) % len
      } else {
        index = (index + len - 1) % len
      }
      PubSub.publish('updateId', { id: recommendSongs[index].id, index: index })
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