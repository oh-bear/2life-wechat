import initCalendar, { getSelectedDay, jumpToToday } from '../Calendar/index';

// Pages/Home/Home/Home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    notes: [],
    weatherImage: '../Images/sunny.png',
    temperature: '19℃',
    weatherText: '晴',
    animation: {
      calendar: '',
      arrow: '',
      showCalendar: false,
    },
    duration: 200
  },

  getList: function () {
    let _this = this
    let key = getApp().data.key
    let lodash = getApp().lodash
    wx.request({
      url: getApp().data.domain + 'notes/list',
      method: 'GET',
      data: {
        uid: key.uid,
        timestamp: key.timestamp,
        token: key.token
      },
      success: function (res) {
        if (res.data.code === 0) {
          let arr = res.data.data.user.concat(res.data.data.partner)
          arr = lodash.orderBy(arr, (val) => {
            return val.created_at
          }, 'desc')
          _this.setData({
            notes: arr
          })
          getApp().data.notes = arr
          console.log(_this.data.notes)
        } else {
          console.log(res.data)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * function
   */
  goDetail: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../Detail/Detail?id=' + id,
    })
  },

  showCalendar: function () {
    let show = this.data.animation.showCalendar
    this.calendar = wx.createAnimation({
      duration: this.data.duration
    })
    this.arrow = wx.createAnimation({
      duration: this.data.duration
    })
    let height = show ? '630rpx' : '0'
    let deg = show ? '-180' : '0'
    this.calendar.height(height).step()
    this.arrow.rotate(deg).step()
    this.setData({
      animation: {
        calendar: this.calendar.export(),
        arrow: this.arrow.export(),
        showCalendar: !show
      }
    })
  },

  getTodayNotes: function () {
    let date = new Date()
    let today = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    }
    this.getSelectedNotes(today)
    jumpToToday()
  },

  getSelectedNotes: function (date) {
    let notes = getApp().data.notes
    let filter = getApp().lodash.filter
    let selectedNotes = filter(notes, (val) => {
      let getDate = new Date(val.updated_at)
      return (getDate.getDate() === date.day) && (getDate.getMonth() + 1 === date.month) && (getDate.getFullYear() === date.year)
    })
    this.setData({
      notes: selectedNotes
    })
  },

  goAdd: function () {
    wx.navigateTo({
      url: '../Add/Add'
    })
  },

  publishNote: function () {
    let note = getApp().data.savedNote || {}
    if (!note.title || !note.content) return
    let key = getApp().data.key
    let user = getApp().data.user
    wx.request({
      url: getApp().data.domain + 'notes/publish',
      method: 'POST',
      data: {
        uid: key.uid,
        timestamp: key.timestamp,
        token: key.token,
        title: note.title,
        content: note.content,
        images: '',
        latitude: getApp().data.location.latitude || user.latitude,
        longitude: getApp().data.location.longitude || user.longitude,
        location: getApp().data.location.location
      },
      success: function (res) {
        if (res.data.code === 0) {
          console.log(res.data)
          getApp().savedNote = ''
        } else {
          console.log(res.data)
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
    this.getList()
    this.setData({
      user: getApp().data.user
    })

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
        console.log(currentSelect)
        _this.getSelectedNotes(currentSelect)
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

    if (!this.data.animation.showCalendar) {
      this.showCalendar()
    }

    this.publishNote()
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