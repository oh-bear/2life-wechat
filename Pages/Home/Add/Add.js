// Pages/Home/Add/Add.js
import initCalendar, { getSelectedDay, jumpToToday } from '../Calendar/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    indicatorColor: 'rgba(255, 255, 255, 0.5)',
    indicatorActiveColor: 'rgba(255, 255, 255, 1)',
    current: 0,
    images: [],
    title: '',
    content: '',
    id: '',
    mode: '',
    date: 0,
    showCalendar: false,
    finish: false
  },

  // methods
  uploadImg: function (event) {
    if (this.data.images.length >= 3) return
    this.addNote()
    let _this = this
    let userId = getApp().data.user.id
    let images = this.data.images
    wx.chooseImage({
      count: 3,
      success: function(res) {
        wx.showLoading({
          title: '正在上传',
        })
        let imgList = []
        for(let i = 0; i < res.tempFilePaths.length; i++) {
          let date = new Date().getTime() + i
          imgList[i] = {
            name: '2life/user/' + userId + '/img_' + date + '.png-2life_note.jpg',
            file: res.tempFilePaths[i]
          }
        }
        getApp().imageUpload(imgList).then(data => {
          wx.hideLoading()
          images = images.concat(data)
          _this.setData({
            images: images
          })
        })
      },
    })
  },

  removeImg: function () {
    let current = this.data.current
    let images = this.data.images
    images.splice(current, 1)
    console.log(images)
    this.setData({
      images: images
    })
  },

  swiperChange(event) {
    var current = event.detail.current
    this.setData({
      current: current
    })
  },

  getInputValue: function (event) {
    let temp = getApp().getInputValue(event)
    this.setData(temp)
  },

  addNote: function () {
    let data = this.data
    let note = {
      title: data.title,
      content: data.content,
      images: data.images,
      id: data.id,
      mode: data.mode,
      date: data.date
    }
    getApp().data.savedNote = note
  },

  getOcrImage () {
    let _this = this
    let content = this.data.content
    wx.chooseImage({
      count: 1,
      success: function(res) {
        let imgList = [
          {
            name: '2life/user/' + getApp().data.user.id + '/img_' + new Date().getTime() + '.png-2life_note.jpg',
            file: res.tempFilePaths[0]
          }
        ]
        wx.showLoading({
          title: '正在识别',
        })
        getApp().imageUpload(imgList).then(data => {
          getApp().getOcr(data[0]).then(data => {
            console.log(data)
            if (content) {
              content = content + '\n'
            }
            getApp().lodash.forEach(data.items, (val) => {
              content = content + val.itemstring + '\n'
            })
            _this.setData({
              content: content
            })
            wx.hideLoading()
          }, err => {
            console.log(err)
            wx.hideLoading()
            wx.showToast({
              title: '识别失败',
            })
          })
        })
      }
    })
  },

  changeCalendarShow () {
    this.setData({
      showCalendar: !this.data.showCalendar
    })
  },

  setDate (seletectedDate) {
    let date = new Date()
    date.setFullYear(seletectedDate.year, seletectedDate.month - 1, seletectedDate.day)
    this.setData({
      date: date.getTime()
    })
    console.log(date)
  },

  save () {
    if (!this.data.title || !this.data.content) {
      wx.showToast({
        icon: 'none',
        title: '请输入标题或内容',
        mask: true
      })
      return
    }
    if (this.data.id) {
      this.updateNote()
    } else {
      this.publishNote()
    }
  },

  clearData () {
    this.setData({
      images: [],
      title: '',
      content: '',
      id: '',
      mode: '',
      date: 0
    })
  },

  publishNote: function () {
    let _this = this
    let key = getApp().data.key
    let user = getApp().data.user
    let images = this.data.images
    if (typeof (images) === 'object') {
      images = images.join()
    }
    let data = {
      uid: key.uid,
      timestamp: key.timestamp,
      token: key.token,
      date: this.data.date,
      title: this.data.title,
      content: this.data.content,
      images: images,
      latitude: getApp().data.location.latitude || user.latitude,
      longitude: getApp().data.location.longitude || user.longitude,
      location: getApp().data.location.location.join('，') || '地球上的某个角落'
    }
    wx.showLoading({
      title: '正在上传',
      mask: true
    })
    this.checkContent(data.title, data.content).then(res => {
      wx.request({
        url: getApp().data.domain + 'notes/publish',
        method: 'POST',
        data: data,
        success: function (res) {
          if (res.data.code === 0) {
            console.log(res.data)
            getApp().data.savedNote = {}
            _this.setData({
              finish: true
            })
            _this.updateEmotion()
            _this.clearData()
            wx.showToast({
              title: '上传成功',
            })
            wx.switchTab({
              url: '/Pages/Home/Home/Home',
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
            console.log(res.data)
          }
        },
        fail: function (err) {
          console.log(err)
          wx.showToast({
            icon: 'none',
            title: '上传失败',
          })
        },
        complete () {
          wx.hideLoading()
        }
      })
    }, err => {
      
    })
  },

  updateNote: function () {
    let _this = this
    let key = getApp().data.key
    let images = this.data.images
    if (typeof (images) === 'object') {
      images = images.join()
    }
    wx.showLoading({
      title: '正在上传',
      mask: true
    })
    let data = {
      uid: key.uid,
      timestamp: key.timestamp,
      token: key.token,
      note_id: this.data.id,
      date: this.data.date,
      title: this.data.title,
      content: this.data.content,
      images: images,
      mode: parseInt(this.data.mode)
    }
    this.checkContent(data.title, data.content).then(res => {
      wx.request({
        url: getApp().data.domain + 'notes/update',
        method: 'POST',
        data: data,
        success: function (res) {
          if (res.data.code === 0) {
            console.log(res.data)
            getApp().data.savedNote = {}
            _this.setData({
              finish: true
            })
            _this.updateEmotion()
            _this.clearData()
            wx.showToast({
              title: '上传成功',
            })
            wx.switchTab({
              url: '/Pages/Home/Home/Home',
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
            console.log(res.data)
          }
        },
        fail: function (err) {
          wx.showToast({
            icon: 'none',
            title: '上传失败',
          })
          console.log(err)
        },
        complete () {
          wx.hideLoading()
        }
      })
    }, err => {
      
    })
  },

  checkContent(title, content) {
    return new Promise((resolve, reject) => {
      this.getAccessToken().then(accessToken => {
        wx.request({
          url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + accessToken.code,
          method: 'POST',
          data: {
            content: content
          },
          success(res) {
            console.log(res.data)
            if (res.data.errcode === 0) {
              resolve(res.data.errcode)
            } else {
              wx.hideLoading()
              wx.showToast({
                icon: 'none',
                title: '内容含敏感词',
                mask: true
              })
              reject(res.data.errcode)
            }
          },
          fail(err) {
            console.log(err)
            wx.hideLoading()
            wx.showToast({
              icon: 'none',
              title: '内容检测失败',
              mask: true
            })
            reject(err)
          }
        })
      }, err => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '获取token失败，请联系管理员',
          mask: true
        })
        reject(err)
      })
    })
  },

  updateEmotion () {
    if (!getApp().data.user.emotions) return
    let data = getApp().data.key
    return new Promise ((resolve, reject) => {
      wx.request({
        url: getApp().data.domain + 'utils/update_emotion_report',
        data: data,
        success(res) {
          console.log(res.data)
          resolve(true)
        },
        fail(err) {
          console.log(err)
          reject(false)
        }
      })
    })
  },

  getAccessToken () {
    let _this = this
    let now = new Date().getTime()
    let accessToken = wx.getStorageSync('access_token')
    return new Promise((resolve, reject) => {
      if (accessToken.deadline < now || !accessToken.deadline) {
        wx.request({
          url: getApp().data.domain + 'utils/access_token',
          data: getApp().data.key,
          success(res) {
            console.log(res.data)
            if (res.data.code === 0) {
              wx.setStorageSync('access_token', res.data.data.access_token)
            }
            resolve(res.data.data.access_token)
          },
          fail(err) {
            console.log(err)
            reject(false)
          }
        })
      } else {
        resolve(accessToken)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      finish: false
    })
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
    let savedNote = getApp().data.savedNote
    console.log(savedNote)
    this.setData({
      images: savedNote.images || [],
      title: savedNote.title || '',
      content: savedNote.content || '',
      id: savedNote.id || '',
      mode: savedNote.mode || 0,
      date: savedNote.created_at ? new Date(savedNote.created_at).getTime() : new Date().getTime()
    })
    wx.setNavigationBarTitle({
      title: '写日记',
    })
    getApp().data.publish = true

    let _this = this
    initCalendar({
      multi: false, // 是否开启多选,
      disablePastDay: false, // 是否禁选过去日期
      /**
       * 选择日期后执行的事件
       * @param { object } currentSelect 当前点击的日期
       * @param { array } allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数）
       */
      afterTapDay: (currentSelect, allSelectedDays) => {
        _this.changeCalendarShow()
        _this.setDate(currentSelect)
      },
      /**
       * 日期点击事件（此事件会完全接管点击事件）
       * @param { object } currentSelect 当前点击的日期
       * @param { object } event 日期点击事件对象
       */
      // onTapDay(currentSelect, event) {
      //   console.log(currentSelect);
      //   console.log(event);
      // },
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setNavigationBarTitle({
      title: '双生',
    })
    if (!this.data.finish) {
      getApp().data.savedNote = {
        id: this.data.id,
        title: this.data.title,
        content: this.data.content,
        images: this.data.images,
        mode: this.data.mode,
        date: this.data.date
      }
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.addNote()
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