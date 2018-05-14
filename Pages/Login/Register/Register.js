// Pages/Login/Register/Register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hi: 'Wow',
    text: '欢迎成为新成员!',
    mobileWarning: '手机号已注册',
    codeWarning: '验证码错误',
    passwordWarning: '密码错误',
    mobileValid: true,
    codeValid: true,
    passwordValid: true,
    mobile: '',
    code: '',
    password: '',
    timestamp: '1',
    codeLoading: false,
    registerLoading: false,
    loadingAnimation: '',
    loadingInterval: ''
  },

  // methods
  getUserInfo(event) {
    let type = event.currentTarget.dataset.type
    let temp = {}
    temp[type] = event.detail.value
    temp[type + 'Valid'] = true
    temp[type + 'Warning'] = ''
    this.setData(temp)
  },

  getCode() {
    let _this = this
    if (!this.data.mobile) {
      this.setData({
        mobileWarning: '请填写手机号',
        mobileValid: false
      })
      return
    } else if (this.data.registerLoading || this.data.codeLoading) {
      return
    }
    this.showLoading('code')
    wx.request({
      url: getApp().data.domain + 'users/code',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
      }, 
      data: {
        account: _this.data.mobile
      },
      success: function (res) {
        let response = res.data
        let code = response.code
        if (code === 0) {
          _this.setData({
            timestamp: response.data.timestamp
          })
        } else {

        }
      },
      complete: function () {
        _this.hideLoading('code')
      }
    })
  },

  register () {
    let _this = this
    let data = this.data
    if (!data.mobileValid && !data.codeValid && !data.passwordValid) return
    if (!data.mobile) {
      this.setData({
        mobileWarning: '请填写手机号',
        mobileValid: false
      })
      return
    } else if (!data.code) {
      this.setData({
        codeWarning: '请填写验证码',
        codeValid: false
      })
      return
    } else if (!data.password) {
      this.setData({
        passwordWarning: '请填写密码',
        passwordValid: false
      })
      return
    } else if (!data.timestamp) {
      return
    }
    this.showLoading('register')
    wx.request({
      url: getApp().data.domain + 'users/register',
      method: 'POST',
      data: {
        account: data.mobile,
        password: data.password,
        code: data.code,
        timestamp: data.timestamp
      },
      success: function (res) {
        let response = res.data
        let code = response.code
        if (code === 0) {
          wx.navigateTo({
            url: './RegisterName',
          })
        } else if (code === 405) {
          _this.setData({
            codeWarning: '验证码错误',
            codeValid: false
          })
        } else {

        }
      },
      complete: function () {
        this.hideLoading('register')
      }.bind(this)
    })
  },

  showLoading: function (type) {
    console.log('showloading')
    if (this.data[type + 'loading']) return
    let temp = {}
    temp[type + 'Loading'] = true
    this.setData(temp)
    temp = {}
    let n = 1
    this.animation.rotate(360).step()
    temp['loadingAnimation'] = this.animation.export()
    temp['loadingInterval'] = setInterval(function () {
      n = n+1
      this.animation.rotate(360*(n)).step()
      temp['loadingAnimation'] = this.animation.export()
      this.setData(temp)
    }.bind(this), 1000*n)
    this.setData(temp)
  },

  hideLoading: function (type) {
    console.log('hideloading')
    let temp = {}
    temp[type + 'Loading'] = false
    temp['loadingAnimation'] = ''
    this.setData(temp)
    clearInterval(this.data.loadingInterval)
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
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
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