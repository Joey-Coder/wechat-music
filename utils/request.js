// 封装功能函数
import config from './config'
/**
 * 网络请求函数
 */
export default (url, data = {}, method = "GET") => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data: data,
      method: method,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}