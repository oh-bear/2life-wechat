// Pages/Profile/Setting/Setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend: false
  },

  changeRecommend () {
    this.setData({
      recommend: !this.data.recommend
    })
    wx.setStorageSync('recommend', this.data.recommend)
  },

  goFeedback() {
    wx.navigateTo({
      url: '../Feedback/Feedback',
    })
  },

  goAgreement () {
    wx.navigateTo({
      url: '../Agreement/Agreement',
    })
  },

  goThanks () {
    wx.navigateTo({
      url: '../Thanks/Thanks',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '设置',
    })
    this.setData({
      recommend: wx.getStorageSync('recommend') ? true : false
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
  
  }
})