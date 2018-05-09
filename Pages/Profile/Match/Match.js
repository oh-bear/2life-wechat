// Pages/Profile/Match/Match.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '匹配失败',
    cancel: '解除匹配',
    name: '邓国雄',
    nickname: '广大最傻逼',
    matchItems: [
      {
        title: '你希望匹配到',
        type: 'gender',
        items: [
          {
            title: '异性',
            value: 'opposite',
            selected: false
          },
          {
            title: '同性',
            value: 'same',
            selected: false
          }
        ]
      },
      {
        title: '你是否希望被匹配到',
        type: 'wish',
        items: [
          {
            title: '希望',
            value: 'agree',
            selected: false
          },
          {
            title: '不希望',
            value: 'disagree',
            selected: false
          }
        ]
      },
      {
        title: '匹配者的特质',
        type: 'speciality',
        items: [
          {
            title: '乐观仙女',
            value: 'optimistic',
            selected: false
          },
          {
            title: '多愁公主',
            value: 'melancholy',
            selected: false
          },
          {
            title: '温婉仙子',
            value: 'gentle',
            selected: false
          }
        ]
      }
    ],
    choose: [],
    tipsList: [
      '../Images/popup_tips 1.png',
      '../Images/popup_tips 2.png',
      '../Images/popup_tips 3.png'
    ],
    currentSwiperItem: 0
  },

  // methods
  chooseMatchType: function (event) {
    var _this = this
    var data = event.currentTarget.dataset
    var str = 'choose[' + data.index + ']'
    this.setData({
      [str]: data.value
    })
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiperItem: e.detail.current
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