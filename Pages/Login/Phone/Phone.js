Page({
  data: {
    Hi: "Hi",
    text: "欢迎来到双生",
    mobileWarning: '手机号码未注册',
    passwordWarning: '密码错误',
    mobileValid: true,
    passwordValid: true,
    mobile: '',
    password: ''
  },

  getInputValid: function(event) {
    let temp = getApp().getInputValid(event)
    this.setData(temp)
  },

  login: function () {
    let data = this.data
    if (!data.mobileValid || !data.passwordValid) return
    if (!data.mobile) {
      this.setData({
        mobileValid: false,
        mobileWarning: '手机号码不能为空'
      })
      return
    } else if (!data.password) {
      this.setData({
        passwordValid: false,
        passwordWarning: '密码不能为空'
      })
      return
    }
    let params = {
      account: data.mobile,
      password: data.password
    }
    getApp().login(params).then(res => {
      wx.switchTab({
        url: '../../Home/Home/Home',
      })
    }, code => {
      let temp = {}
      if (code === 300) {
        temp = {
          passwordValid: false,
          passwordWarning: '密码错误'
        }
      } else if (code === 404) {
        temp = {
          mobileValid: false,
          mobileWarning: '用户不存在'
        }
      } else {
        wx.showToast({
          title: '登录失败',
        })
        return
      }
      this.setData(temp)
    })
  }
})