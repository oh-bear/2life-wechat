// Pages/Profile/Info/Info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    name: '',
    face: ''
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
        let date = new Date().getTime()
        let userId = _this.data.user.id
        let imgList = [
          {
            name: '2life/user/' + userId + '/img_' + date + '.png-2life_face.jpg',
            file: res.tempFilePaths[0]
          }
        ]
        wx.showLoading({
          title: '正在上传',
        })
        getApp().imageUpload(imgList).then(data => {
          console.log(data)
          getApp().updateUser({
            face: data[0]
          }).then(status => {
            _this.setData({
              face: res.tempFilePaths[0]
            })
          })
        })
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
      name: getApp().data.user.name,
      face: getApp().data.user.face
    })
    wx.setNavigationBarTitle({
      title: '个人信息',
    })
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
    return getApp().data.shareMenu
  }
})