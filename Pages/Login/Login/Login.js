Page({
  data: {
    Hi: "Hi",
    text: "欢迎来到双生"
  },
  goPhoneLogin () {
    wx.navigateTo({
      url: '../Phone/Phone',
    })
  },
  goRegister () {
    wx.navigateTo({
      url: '../Register/Register',
    })
  }
})