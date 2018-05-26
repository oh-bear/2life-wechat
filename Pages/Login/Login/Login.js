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
  },
  getUserInfo: function (event) {
    console.log(event.detail)
    let userInfo = event.detail.userInfo
    getApp().wxLogin(userInfo).then(data => {
      wx.switchTab({
        url: '../../Home/Home/Home',
      })
    })
  }
})