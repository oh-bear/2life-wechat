// Pages/Profile/Feedback/Feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: [
      {
        title: 'Bug反馈',
        code: 103
      },
      {
        title: '功能需求',
        code: 200
      },
      {
        title: '吐槽',
        code: 300
      }
    ],
    choose: 103,
    content: ''
  },

  // method
  getOption (event) {
    this.setData({
      choose: parseInt(event.currentTarget.dataset.code)
    })
  },

  getInputValue (event) {
    let temp = getApp().getInputValue(event)
    this.setData(temp)
  },

  confirm () {
    if (!this.data.content) return
    let data = getApp().data.key
    data.title = this.data.content.slice(0, 19)
    data.content = this.data.content
    data.type = parseInt(this.data.choose)
    console.log(data)
    wx.showLoading({
      title: '正在提交',
    })
    wx.request({
      url: getApp().data.domain + 'users/feedback',
      method: 'POST',
      data: data,
      success (res) {
      }
    })
    wx.showToast({
      title: '提交成功',
    })
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
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
    wx.setNavigationBarTitle({
      title: '反馈',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setNavigationBarTitle({
      title: '双生',
    })
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