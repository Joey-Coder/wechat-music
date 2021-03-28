// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    password: ''
  },

  /**
   * 用户名校验
   */
  handleInput(e) {
    this.setData({
      [e.target.id]: e.detail.value
    })
  },
  /**
   * 点击登录按钮
   */
  async handleLogin() {
    // 校验手机号不能为空
    if (!this.data.userName) {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
      return
    }
    // 校验手机号格式
    const phoneReg = /^1[3-9]\d{9}$/
    if (!phoneReg.test(this.data.userName)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }
    // 校验密码
    if (!this.data.password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return
    }
    // 发起登录请求
    wx.showToast({
      title: '登录中...',
      icon: 'loading'
    })
    const { code, profile } = await request(
      '/login/cellphone',
      {
        phone: this.data.userName,
        password: this.data.password
      },
      'GET',
      {
        isLogin: true
      }
    )
    if (code === 200) {
      wx.showToast({
        title: '登录成功',
      })
      wx.setStorageSync('userInfo', profile)
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
    } else if (code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: "none"
      })
    } else if (code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: "none"
      })
    } else {
      wx.showToast({
        title: '登录失败 ' + code,
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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