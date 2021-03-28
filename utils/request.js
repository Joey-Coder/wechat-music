// 封装功能函数
import config from './config'
/**
 * 网络请求函数
 */
export default (url, data = {}, method = "GET", meta = {}) => {
  return new Promise((resolve, reject) => {
    var header = {}
    if (meta.requireLogin) {
       header = {
        cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.includes('MUSIC_U')) : ''
      }
    }
    wx.request({
      url: config.host + url,
      data: data,
      method: method,
      header: header,
      success: (res) => {
        // 如果是登录请求，存储cookie
        if (meta.isLogin) {
          wx.setStorageSync('cookies', res.cookies)
        }
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}