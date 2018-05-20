// Pages/Home/Detail/Detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    indicatorColor: 'rgba(255, 255, 255, 0.5)',
    indicatorActiveColor: 'rgba(255, 255, 255, 1)',
    current: 0,
    note: {}
  },

  /**
   * function
   */
  swiperChange (event) {
    var current = event.detail.current
    this.setData({
      current: current
    })
  },
  like () {
    if (this.data.note.is_liked) return
    let _this = this
    let data = getApp().data.key
    let note = this.data.note
    data.note_id = note.id
    wx.request({
      url: getApp().data.domain + 'notes/like',
      method: 'POST',
      data: data,
      success: function (res) {
        if (res.data.code === 0) {
          note.is_liked = 1
          _this.setData({
            note: note
          })
        } else {
          console.log(res)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let find = getApp().lodash.find
    let note = find(getApp().data.notes, (val) => {
      return val.id === Number(options.id)
    })
    this.setData({
      note: note
    })
    console.log(note)
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