//app.js
App({
  data: {
    domain: 'https://2life.api.ursb.me/',
    user: {},
    key: {},
    partner: {}
  },

  getInputValid: function(event) {
    let type = event.currentTarget.dataset.type
    let temp = {}
    temp[type] = event.detail.value
    temp[type + 'Valid'] = true
    temp[type + 'Warning'] = ''
    return temp
  },

  login: function (obj) {
    let _this = this
    wx.showLoading({
      title: '正在登录...',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: _this.data.domain + 'users/login',
        method: 'POST',
        data: {
          account: obj.account,
          password: obj.password
        },
        success: function (res) {
          let data = res.data.data
          let code = res.data.code
          if (code === 0) {
            _this.data.key = data.key
            _this.data.user = data.user
            _this.data.partner = data.data
            resolve({
              key: data.key,
              user: data.user,
              partner: data.partner
            })
          } else {
            reject(code)
          }
        },
        fail: function (err) {
          console.log(err)
          reject(err)
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  },

  getUser: function() {
    let _this = this
    let data = this.data
    wx.showLoading({
      title: '正在获取用户信息...',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: data.domain + 'users/user',
        method: 'GET',
        data: {
          uid: data.key.uid,
          timestamp: data.key.timestamp,
          token: data.key.token,
          user_id: data.user.id
        },
        success: function (res) {
          if (res.data.code === 0) {
            _this.data.user = res.data.data
            resolve(_this.data.user)
          } else {
            console.log(res.data)
            reject('err')
          }
        },
        fail: function (err) {
          reject(err)
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  },

  updateUser: function (obj) {
    let _this = this
    let key = this.data.key
    let user = this.data.user
    let temp = {
      uid: key.uid,
      timestamp: key.timestamp,
      token: key.token,
      name: user.name,
      face: user.face,
      sex: user.sex,
      status: user.status,
      latitude: user.latitude || 0,
      longitude: user.longitude || 0,
      badge_id: -1
    }
    for (let key in obj) {
      temp[key] = obj[key]
    }
    console.log(temp)
    wx.showLoading({
      title: '正在更新用户信息...',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: _this.data.domain + 'users/update',
        method: 'POST',
        data: temp,
        success: function (res) {
          if (res.data.code === 0) {
            resolve(true)
          } else {
            reject('err')
          }
        },
        fail: function (err) {
          console.log(err)
          reject(err)
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  }

})