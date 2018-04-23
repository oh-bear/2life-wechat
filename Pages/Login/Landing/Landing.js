Page({
  data: {
    landing: '记录美好时光',
    copyright: '双生日记'
  },
  onShow() {
    setTimeout( () => {
      wx.navigateTo({
        url: '../Login/Login',
      })
    }, 2000)
  }
})