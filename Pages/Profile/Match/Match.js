// Pages/Profile/Match/Match.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      normal: '选择你的匹配项',
      matching: '匹配中',
      success: '匹配成功！',
      fail: '匹配失败'
    },
    status: 'normal',
    matchMethod: 'random',
    name: '邓国雄',
    nickname: '广大最傻逼',
    matchItems: [
      {
        title: '你是否想开启匹配功能',
        type: 'gender',
        items: [
          {
            title: '开启',
            value: 'Yes',
            code: 1
          },
          {
            title: '关闭',
            value: 'No',
            code: 999
          }
        ]
      },
      {
        title: '你希望匹配到',
        type: 'gender',
        items: [
          {
            title: '异性',
            value: 'opposite',
            code: 1
          },
          {
            title: '同性',
            value: 'same',
            code: 2
          }
        ]
      },
      {
        title: '匹配者的特质',
        type: 'speciality',
        items: [
          {
            title: '相同',
            value: 'same',
            code: 1
          },
          {
            title: '互补',
            value: 'complement',
            code: 2
          },
          {
            title: '随意',
            value: 'notcare',
            code: 3
          }
        ]
      }
    ],
    choose: [1, 1, 1],
    matchClosed: false,
    animation: {
      first: '',
      second: '',
      third: ''
    },
    animationDuration: 1000,
    tipsList: [
      '../Images/popup_tips 1.png',
      '../Images/popup_tips 2.png',
      '../Images/popup_tips 3.png'
    ],
    currentSwiperItem: 0
  },

  // methods
  chooseMethod: function (event) {
    this.setData({
      matchMethod: event.currentTarget.dataset.method
    })
  },

  chooseMatchType: function (event) {
    let data = event.currentTarget.dataset
    let str = 'choose[' + data.index + ']'
    this.setData({
      [str]: data.code,
      matchClosed: data.code === 999 ? true : false
    })
    this.setUserStatus()
  },

  setUserStatus: function () {
    let status
    if (this.data.matchClosed) {
      status = 999
    } else {
      let user = getApp().data.user
      let choose = this.data.choose
      status = choose[1] * 100 + user.sex * 10 + choose[2]
    }
    getApp().updateUser({ status: status })
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiperItem: e.detail.current
    })
  },

  match: function () {
    if (this.data.status !== 'normal') return
    let data = this.data
    if (data.matchMethod === 'random') {
      if (data.choose.length < 3) return
      this.randomMatch()
    } else if (data.method === 'accurate') {
      
    }
  },

  randomMatch: function () {
    this.setData({
      status: 'matching'
    })
    let interval = setInterval(function () {
      this.resetAnimation()
      this.animation()
    }.bind(this), 50)
    let key = getApp().data.key
     return new Promise((resolve, reject) => {
       wx.request({
         url: getApp().data.domain + 'users/connect_by_random',
         method: 'GET',
         data: key,
         success: function (res) {
           if (res.data.code === 0) {
             resolve(0)
           } else {
             reject(res.data.code)
           }
         },
         fail: function (err) {
           console.log(err)
           reject(false)
         },
         complete: function () {
           clearInterval(interval)
         }
       })
     })
  },
  
  animation: function () {
    // animation
    let duration = this.data.animationDuration
    this.animationFirst = wx.createAnimation({
      duration
    })
    this.animationSecond = wx.createAnimation({
      duration
    })
    this.animationThird = wx.createAnimation({
      duration
    })
    this.animationFirst.top('108rpx').left('108rpx').right('108rpx').bottom('108rpx').step()
    this.animationSecond.backgroundColor('rgba(45, 195, 166, 0.4)').step()
    this.animationThird.top('0rpx').left('0rpx').right('0rpx').bottom('0rpx').backgroundColor('rgba(45, 195, 166, 0.1)').step()
    this.setData({
      animation: {
        first: this.animationFirst.export(),
        second: this.animationSecond.export(),
        third: this.animationThird.export()
      }
    })
  },
  resetAnimation: function () {
    // animation
    this.animationFirst = wx.createAnimation({
      duration: 0
    })
    this.animationSecond = wx.createAnimation({
      duration: 0
    })
    this.animationThird = wx.createAnimation({
      duration: 0
    })
    this.animationFirst.top('0rpx').left('0rpx').right('0rpx').bottom('0rpx').step()
    this.animationSecond.backgroundColor('rgba(45, 195, 166, 1)').step()
    this.animationThird.top('108rpx').left('108rpx').right('108rpx').bottom('108rpx').backgroundColor('rgba(45, 195, 166, 0.4)').step()
    this.setData({
      animation: {
        first: this.animationFirst.export(),
        second: this.animationSecond.export(),
        third: this.animationThird.export()
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
    let user = getApp().data.user
    if (user.status === 999) {
      let status = 999
      this.setData({
        choose: [999, 1, 1],
        matchClosed: true
      })
    } else {
      let gender = parseInt(user.status / 100)
      let character = user.status - gender * 100 - user.sex * 10
      this.setData({
        choose: [
          user.status === 999 ? user.status : 1,
          gender,
          character
        ]
      })
    }
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