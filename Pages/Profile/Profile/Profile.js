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
    partner: {},
    icon: [
      {
        book: '../Images/book_male.png',
        smile: '../Images/smile_male.png'
      },
      {
        book: '../Images/book_female.png',
        smile: '../Images/smile_female.png'
      }
    ],
    showMatch: false
  },

  // method
  goMatch: function () {
    wx.navigateTo({
      url: '../Match/Match'
    })
  },

  goInfo: function () {
    wx.navigateTo({
      url: '../Info/Info',
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
    let _this = this
    getApp().getUser().then(data => {
      console.log(data)
      _this.setData({
        user: data.user,
        partner: data.partner
      })
    })
    this.setData({
      showMatch: getApp().data.showMatch
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