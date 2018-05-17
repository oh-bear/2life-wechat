// Pages/Profile/Profile/Profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    male: '../Images/male.png',
    female: '../Images/female.png',
    mood: 87,
    diary: 12,
    time: '10分钟前',
    user: {},
    patchedUser: {},
    icon: [
      {
        book: '../Images/book_male.png',
        smile: '../Images/smile_male.png'
      },
      {
        book: '../Images/book_female.png',
        smile: '../Images/smile_female.png'
      }
    ]
  },

  // method
  goMatch: function () {
    wx.navigateTo({
      url: '../Match/Match'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    this.setData({
      user: getApp().data.user
    })
    console.log(this.data.user)
    let patchedUserId = this.data.user.user_other_id
    if (patchedUserId === -1) return
    getApp().getPatchedUser(id).then(patchedUser => {
      _this.patchedUser = patchedUser
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