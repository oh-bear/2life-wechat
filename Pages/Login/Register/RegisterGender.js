// Pages/Login/Register/RegisterGender.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hi: 'Hey',
    text: '你的性别是?',
    description: '性别仅用于匹配。性别确定后不能再次修改，请谨慎！',
    gender: 'male'
  },

  // methods

  chooseGender (event) {
    let gender = event.currentTarget.dataset.gender
    console.log(gender)
    this.setData({
      gender: gender
    })
  },

  goNext () {
    getApp().updateUser({ sex: this.data.gender === 'male' ? 0 : 1 }).then(res => {
      wx.switchTab({
        url: '../../Home/Home/Home',
      })
    }, err => {
      wx.showToast({
        title: '出错了',
      })
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