// Pages/Notification/Notification/Notification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    icon: {
      101: '../Images/101.png',
      201: '../Images/201.png',
      202: '../Images/202.png',
      203: '../Images/203.png'
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
    let _this = this
    wx.request({
      url: getApp().data.domain + 'users/show_notification',
      method: 'GET',
      data: getApp().data.key,
      success: function (res) {
        if (res.data.code === 0) {
          _this.setData({
            list: res.data.data
          })
        } else {
          console.log(res.data)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
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
    return getApp().data.shareMenu
  }
})