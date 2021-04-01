// pages/songDetail /songDetail.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'
// 获取全局实例
var appInstance = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    songDetail: {},
    songAddress: '',
    index: 0,
    songId: ''
  },
  /**
   * 播放/暂停歌曲
   */
  handlePlay() {
    // console.log('handlePlay')
    this.setData(
      {
        isPlay: !this.data.isPlay
      }
    )
    if (this.data.isPlay) {
      this.audio.src = this.data.songAddress
      this.audio.title = this.data.songDetail.name
    } else {
      this.audio.pause()
    }
  },

  /**
   * 获取歌曲详情
   * @param {String} ids 
   */
  async getSongDetail(ids) {
    let { code, songs } = await request(
      '/song/detail',
      { ids },
      'GET',
      {}
    )
    if (code === 200) {
      this.setData({
        songDetail: songs[0]
      })
    }
  },

  /**
   * 获取歌曲播放地址
   * @param {String} id 
   */
  async getSongAddress(id) {
    let { code, data } = await request(
      '/song/url',
      { id },
      'GET',
      {}
    )
    if (code === 200 && data.length) {
      this.setData({
        songAddress: data[0].url
      })
    }
  },

  /**
   * 切歌事件
   * @param {Object} e 
   */
  switchSong(e) {
    let type = e.currentTarget.dataset.type
    let { index } = this.data
    PubSub.publish('switchSong', { type, index })
  },

  /**
   * 修改播放状态
   * @param {Boolean} isPlay 
   */
  changeStatus(isPlay) {
    this.setData({
      isPlay
    })
    appInstance.isPlay = isPlay
  },
  /**
   * 初识化音乐播放，获取音乐详情，地址等
   */
  async initAudio() {
    let { songId } = this.data
    await this.getSongDetail(songId)
    await this.getSongAddress(songId)
    if (appInstance.isPlay && appInstance.audioId === songId) {
      // console.log('is Play')
      this.setData({
        isPlay: true,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 添加一个背景播放控制器
    let { id, index } = options
    this.audio = wx.getBackgroundAudioManager()
    this.setData({
      index: index,
      songId: id
    })
    this.initAudio()

    this.audio.onPlay(() => {
      // console.log('onPlay')
      this.changeStatus(true)
      appInstance.audioId = id
    })
    this.audio.onPause(() => {
      // console.log('onPause')
      this.changeStatus(false)
    })
    this.audio.onStop(() => {
      this.changeStatus(false)
      appInstance.audioId = ''
    })
    // 订阅更新的歌曲id,index
    PubSub.subscribe('updateId', async (msg, data) => {
      console.log(msg, data)
      let { id, index } = data
      this.setData({
        songId: id,
        index: index
      })
      await this.initAudio()
      this.setData({
        isPlay: false
      })
      this.handlePlay()

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