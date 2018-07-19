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
    showCalendar: false
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
      mode: data.mode
    }
    getApp().data.savedNote = note
  },

  getOcrImage () {
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
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
    let savedNote = getApp().data.savedNote
    console.log(savedNote)
    console.log()
    this.setData({
      images: savedNote.images || [],
      title: savedNote.title || '',
      content: savedNote.content || '',
      id: savedNote.id || '',
      mode: savedNote.mode || 0
    })
    wx.setNavigationBarTitle({
      title: '写日记',
    })
    getApp().data.publish = true

    this.setData({
      date: new Date().getTime()
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