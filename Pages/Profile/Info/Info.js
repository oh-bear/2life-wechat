// Pages/Profile/Info/Info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    name: ''
  },

  // method
  getInputValue: function (event) {
    let temp = getApp().getInputValue(event)
    this.setData(temp)
    console.log(temp)
  },

  updateName: function () {
    if (this.data.name === this.data.user.name) return
    getApp().updateUser({ name: this.data.name })
    console.log(this.data.name === this.data.user.name)
  },

  getAvatar: function () {
    let _this = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        let file = res.file[0]
        let filename = _this.data.user.id + '_avatar'
      }
    })
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
    this.setData({
      user: getApp().data.user,
      name: getApp().data.user.name
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
  
  }
})