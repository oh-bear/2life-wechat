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
    matchId: '',
    cancelAlert: false,
    animation: {
      first: '',
      second: '',
      third: ''
    },
    animationDuration: 1000,
    msg: {
      404: '找不到合适的用户哦~请再等等吧！',
      501: '你的匹配次数已经用光了哦~',
      502: '你需要先发布一篇日记才能匹配其他人！',
      503: '你的账户被永久封禁！',
      504: '你的账户被封禁了！',
      601: '对方已经有匹配对象了哦',
      602: '匹配失败，请稍候重试！',
      604: '用户还没有写过日记，无法匹配哦！'
    },
    errMsg: '',
    tipsList: [
      '../Images/popup_tips 1.png',
      '../Images/popup_tips 2.png',
      '../Images/popup_tips 3.png'
    ],
    currentSwiperItem: 0,
    user: {},
    partner: {}
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

  getInputValue: function (event) {
    let temp = getApp().getInputValue(event)
    this.setData(temp)
    console.log(this.data.matchId)
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

  setStatus: function (event) {
    this.setData({
      status: event.currentTarget.dataset.goStatus
    })
  },

  match: function () {
    if (this.data.status !== 'normal') return
    this.matchRequest().then(data => {
      console.log(data)
      getApp().data.patchUser = data
      this.setData({
        status: 'success',
        partner: data
      })
    }, status => {
      console.log(status)
      this.setData({
        status: 'fail',
        errMsg: this.data.msg[status]
      })
    })
  },

  matchRequest: function () {
    let data = this.data
    let key = getApp().data.key
    if (data.matchMethod === 'random' && data.choose.length < 3) {
      return
    } else if (data.matchMethod === 'accurate' && !data.matchId) {
      return
    }
    this.setData({
      status: 'matching'
    })
    let interval = setInterval(function () {
      this.resetAnimation()
      this.animation()
    }.bind(this), 50)
    if (data.matchMethod === 'random') {
      return new Promise((resolve, reject) => {
        wx.request({
          url: getApp().data.domain + 'users/connect_by_random',
          method: 'GET',
          data: key,
          success: function (res) {
            if (res.data.code === 0) {
              resolve(res.data.data)
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
    } else if (data.matchMethod === 'accurate') {
      key['code'] = data.matchId
      return new Promise((resolve, reject) => {
        wx.request({
          url: getApp().data.domain + 'users/connect_by_id',
          method: 'GET',
          data: key,
          success: function (res) {
            if (res.data.code === 0) {
              resolve(res.data.data)
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
    }
  },

  cancelMatch: function (event) {
    if (!this.data.cancelAlert) {
      this.setData({
        cancelAlert: true
      })
      return
    }
    let _this = this
    let confirm = event.currentTarget.dataset.confirm
    let temp = {
      cancelAlert: false
    }
    if (confirm === 'confirm') {
      wx.request({
        url: getApp().data.domain + 'users/disconnect',
        method: 'GET',
        data: getApp().data.key,
        success: function (res) {
          console.log(res.data)
          temp.status = res.data.code === 0 ? 'normal' : _this.data.status
          getApp().updateUser({ status: 101 })
          _this.setData({
            choose: [1, 1, 1]
          })
        },
        fail: function (err) {
          console.log(err)
        },
        complete: function () {
          _this.setData(temp)
        }
      })
    } else if (confirm === 'cancel') {
      this.setData(temp)
    }
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
      let status = user.status
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
          gender || 1,
          character <= 0 ? 1 : character
        ]
      })
      console.log(this.data.choose)
    }

    let status = ''
    let errMsg = ''
    if (user.status < 500 || user.status === 999) {
      status = 'normal'
    } else if (user.status === 1000) {
      status = 'success'
    } else {
      status = 'fail'
      errMsg = this.data.msg[user.status]
    }
    this.setData({
      user: user,
      partner: getApp().data.partner,
      status: status,
      errMsg: errMsg
    })
    console.log(getApp().data.partner)
    console.log(this.partner)
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