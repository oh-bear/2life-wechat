// Pages/Login/Register/RegisterName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hi: '注册成功',
    text: '取个好听的昵称吧',
    nameWarning: '该昵称不可用',
    nameValid: true,
    name: ''
  },

  getInputValid: function(event) {
    let temp = getApp().getInputValid(event)
    this.setData(temp)
  },

  goNext () {
    let data = this.data
    if (!data.nameValid) {
      return
    } else if (!data.name) {
      this.setData({
        nameValid: false,
        nameWarning: '昵称不可为空'
      })
      return
    }
    getApp().updateUser({ name: data.name }).then( res => {
      wx.navigateTo({
        url: './RegisterGender',
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