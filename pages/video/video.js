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
    videoId: null,
    // 记录视频播发进度
    videoTimeRecord: [],
    // 是否显示下拉icon
    isRefresh: false
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
        videoList: videoList,
        isRefresh: false

      })
      wx.hideLoading({
        success: (res) => { },
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
      videoList: [{}],
      videoId: null
    })
    this.getVideoList(this.data.activeId)
  },

  /**
   * 监听视频播放，解决多个视频同时播放问题
   */
  handlePlay(e) {
    let vid = e.target.id
    let { videoTimeRecord } = this.data
    // this.lastId !== vid && this.videoContext && this.videoContext.pause()
    this.setData({
      videoId: vid
    })
    this.videoContext = wx.createVideoContext(vid)
    let temp = videoTimeRecord.find(item => item.vid === vid)
    if (temp) {
      console.log('jump to ', temp.currentTime)
      this.videoContext.seek(temp.currentTime)
    }
    // this.videoContext.play()
    // let index = this.data.videoTimeRecord.findIndex(item => item.vid === vid)
    // if (index !== -1) {
    //   console.log(index)
    //   console.log(this.data.videoTimeRecord[index].currentTime)
    //   this.videoContext.seek(this.data.videoTimeRecord[index].currentTime)
    // } else {
    //   this.videoContext.play()
    // }
  },

  /**
   * 监听视频播放进度，并记录视频的当前播放进度
   * @param {Object} e 
   * todo: 加个防抖
   */
  handleTimeUpdate(e) {
    // console.log(e)
    let { videoId } = this.data
    // 判断当前id是否等于播放视频的id
    // 避免当不暂停视频，直接播放其他视频时，当前视频的播放进度被设置为-1
    if (videoId !== e.currentTarget.id) return
    let temp = { vid: e.currentTarget.id, currentTime: e.detail.currentTime }
    console.log(temp)
    let { videoTimeRecord } = this.data
    // 寻找是否已存在视频播发记录
    let index = videoTimeRecord.findIndex(item => item.vid === e.target.id)
    // console.log(temp)
    if (index !== -1) {
      // 已经存在，更新
      videoTimeRecord[index] = temp
    } else {
      // 未存在，添加
      videoTimeRecord.push(temp)
    }
    this.setData({
      videoTimeRecord: videoTimeRecord
    })
  },

  /**
   * 视频播放结束时触发
   * @param {Object} e 
   */
  handleEnd(e) {
    let { videoTimeRecord } = this.data
    let index = videoTimeRecord.findIndex(item => item.vid === e.target.id)
    if (index !== -1) {
      videoTimeRecord.splice(index, 1)
    }
    this.setData({
      videoTimeRecord: videoTimeRecord
    })
  },

  /**
   * 下拉刷新视频 
   */
  handleRefreshVideo() {
    wx.showLoading({
      title: '刷新中',
    })
    this.getVideoList(this.data.activeId)
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