import initCalendar, { getSelectedDay, jumpToToday } from '../Calendar/index';

// Pages/Home/Home/Home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    partner: {},
    notes: [],
    weatherImage: '../Images/sunny.png',
    animation: {
      calendar: '',
      arrow: '',
      showCalendar: false,
    },
    duration: 200,
    userWeather: {},
    partnerWeather: {},
    change: false,
    modeChange: false,
    changeAnimation: ''
  },

  getList: function () {
    let _this = this
    let lodash = getApp().lodash
    wx.request({
      url: getApp().data.domain + 'notes/list',
      method: 'GET',
      data: getApp().data.key,
      success: function (res) {
        if (res.data.code === 0) {
          let arr = res.data.data.user.concat(res.data.data.partner)
          arr = lodash.orderBy(arr, (val) => {
            return val.date ? val.date : val.created_at
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
      },
      complete: function () {
        wx.hideLoading()
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
    this.setData({
      notes: getApp().data.notes
    })
    jumpToToday()
  },

  getSelectedNotes: function (date) {
    let notes = getApp().data.notes
    let filter = getApp().lodash.filter
    let selectedNotes = filter(notes, (val) => {
      let getDate = new Date(val.created_at)
      return (getDate.getDate() === date.day) && (getDate.getMonth() + 1 === date.month) && (getDate.getFullYear() === date.year)
    })
    this.setData({
      notes: selectedNotes
    })
    this.showCalendar()
  },

  goAdd: function () {
    if (!getApp().data.hasAuthorize) {
      wx.switchTab({
        url: '../../Profile/Profile/Profile',
      })
    } else {
      wx.navigateTo({
        url: '../Add/Add'
      })
    }
  },

  exchange: function () {
    if (!this.data.partner.id) return
    let change = this.data.change
    this.data.changeAnimation = wx.createAnimation({
      duration: 200
    })
    let deg = change ? 0 : 180
    this.data.changeAnimation.rotate(deg).step()
    this.setData({
      changeAnimation: this.data.changeAnimation.export()
    })
    setTimeout(function () {
      this.setData({
        change: !change
      })
    }.bind(this), 200)
  },
  changeWeather: function () {
    if (!getApp().data.user.id) return
    this.setData({
      modeChange: !this.data.modeChange
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

    if (getApp().data.user.id) {
      let weather = getApp().getStorageWeather()
      this.setData({
        user: getApp().data.user,
        partner: getApp().data.partner,
        userWeather: weather.userWeather || {},
        partnerWeather: weather.partnerWeather || {}
      })
      this.getList()
      
    } else {
      getApp().wxLogin().then(data => {
        console.log(data)
        data.weather = data.weather || {}
        _this.setData({
          user: data.user,
          partner: data.partner,
          userWeather: data.weather.userWeather || {},
          partnerWeather: data.weather.partnerWeather || {}
        })
        _this.getList()
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
    return getApp().data.shareMenu
  }
})