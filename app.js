//app.js
App({
  data: {
    domain: 'https://2life.api.ursb.me/',
    user: {},
    key: {},
    partner: {},
    notes: [],
    savedNote: {},
    location: {
      location: []
    },
    locationKey: '9d6935d546e2b3ec1ee3b872c1ee9bbe',
    weatherKey: '0d769b31ca454261919def4f08864cf6'
  },

  lodash: {
    groupBy: require('./utils/lodash.groupby/index.js'),
    orderBy: require('./utils/lodash.orderby/index.js'),
    find: require('./utils/lodash.find/index.js'),
    filter: require('./utils/lodash.filter/index.js')
  },

  getInputValue: function (event) {
    let type = event.currentTarget.dataset.type
    let temp = {}
    temp[type] = event.detail.value
    return temp
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
            _this.data.partner = data.partner
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
            _this.data.partner = res.data.partner
            resolve({
              user: _this.data.user,
              partner: _this.data.partner
            })
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

  getMatchedUser: function (id) {
    let _this = this
    let data = this.data
    return new Promise((resolve, reject) => {
      wx.request({
        url: data.domain + 'users/user',
        method: 'GET',
        data: {
          uid: data.key.uid,
          timestamp: data.key.timestamp,
          token: data.key.token,
          user_id: id
        },
        success: function (res) {
          if (res.data.code === 0) {
            _this.partner = res.data.data.user
            _this.user = res.data.data.partner
            resolve(res.data.data.user)
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
  },

  getLocation: function (location) {
    let _this = this
    wx.request({
      url: 'http://restapi.amap.com/v3/geocode/regeo',
      method: 'GET',
      data: {
        key: _this.data.locationKey,
        location: location.longitude + ',' + location.latitude
      },
      success: function (res) {
        if (res.data.status !== '1') return
        let data = res.data.regeocode.addressComponent
        _this.data.location = {
          longitude: location.longitude,
          latitude: location.latitude,
          location: [data.city, data.province, data.country]
        }
        console.log(_this.data.location)
      }
    })
  },

  onLaunch: function () {
    let params = {
      account: '15622386480',
      password: '123qwe'
    }
    let _this = this
    this.login(params)
    wx.getLocation({
      success: function(location) {
        _this.getLocation(location)
      },
      fail: function (err) {
        _this.getLocation({
          longitude: _this.user.longitude,
          latitude: _this.user.latitude
        })
      }
    })
  }
})