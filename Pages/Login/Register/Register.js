// Pages/Login/Register/Register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hi: 'Wow',
    text: '欢迎成为新成员!',
    phoneWarning: '手机号已注册',
    codeWarning: '验证码错误',
    passwordWarning: '密码错误',
    phoneValid: true,
    codeValid: true,
    passwordValid: true
  },

  register () {
    wx.navigateTo({
      url: './RegisterName',
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