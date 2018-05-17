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
  },

  // methods
  getInputValid: function (event) {
    let temp = getApp().getInputValid(event)
    this.setData(temp)
  },

  getCode: function() {
    let _this = this
    if (!this.data.mobile) {
      this.setData({
        mobileWarning: '请填写手机号',
        mobileValid: false
      })
      return
    }
    wx.showLoading({
      title: '发送中...',
    })
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
          wx.showToast({
            title: '验证码发送失败',
            duration: 2000,
            mask: true
          })
        }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },

  register: function () {
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
      this.setData({
        codeWarning: '验证码格式有误,请重新获取.',
        codeValid: false
      })
    }
    wx.showLoading({
      title: '正在注册...',
    })
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
          wx.showLoading({
            title: '正在自动登录...',
          })
          wx.request({
            url: getApp().data.domain + 'users/login',
            method: 'POST',
            data: {
              account: data.mobile,
              password: data.password
            },
            success: function (res) {
              console.log(res)
              let response = res.data
              let code = response.code
              if (code === 0) {
                getApp().data.user = response.data.user
                getApp().data.key = response.data.key
                getApp().data.partner = response.data.partner
                wx.navigateTo({
                  url: './RegisterName',
                })
              }
            },
            fail: function (err) {
              console.log(err)
            },
            complete: function () {
              wx.hideLoading()
            }
          })
        } else if (code === 405) {
          _this.setData({
            codeWarning: '验证码错误',
            codeValid: false
          })
        } else {
          wx.showToast({
            title: '注册失败,请重新尝试.',
            duration: 2000,
            mask: true
          })
        }
      },
      complete: function () {
        wx.hideLoading()
      }.bind(this)
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