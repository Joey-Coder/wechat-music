// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    activeId: null,
    videoList: [{}],
    videoId: null
  },


  /**
   * 获取视频标签
   */
  async getNavList() {
    let { code, data } = await request(
      '/video/group/list',
    )
    if (code === 200) {
      this.setData(
        {
          navList: data.slice(0, 14),
          activeId: data[0].id
        }
      )
      // 获取标签成功后，马上获取第一个标签的视频
      this.getVideoList(this.data.activeId)
    }
  },
  /**
   * 根据标签id获取视频
   */
  async getVideoList(id) {
    let { code, datas } = await request(
      '/video/group',
      { id },
      'GET',
      { requireLogin: true }
    )
    if (code === 200) {
      let videoList = datas.map((item, index) => {
        item.id = index
        return item
      })
      this.setData({
        videoList: videoList
      })
    }
  },
  /**
   * 记录当前标签，并获取标签视频
   * @param {Object} e 
   */
  setActiveId(e) {
    // wx.showToast({
    //   title: '切换中',
    //   icon: 'loading'
    // })
    wx.showLoading({
      title: '切换中',
    })
    this.setData({
      activeId: e.target.dataset.id,
      videoList: [{}]
    })
    this.getVideoList(this.data.activeId)
    if (this.data.videoList !== [{}]) {
      wx.hideLoading({
        success: (res) => {
          // wx.showToast({
          //   title: '切换成功',
          // })
        },
      })
    }
  },

  /**
   * 监听视频播放，解决多个视频同时播放问题
   */
  handlePlay(e) {
    let vid = e.target.id
    // this.lastId !== vid && this.videoContext && this.videoContext.pause()
    this.setData({
      videoId: vid
    })
    // this.videoContext = wx.createVideoContext(this.data.videoId)
    // this.videoContext.play()
  },


  /**
* 生命周期函数--监听页面加载
*/
  onLoad: function (options) {
    this.getNavList()
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