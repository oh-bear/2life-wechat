// Pages/Home/Detail/Detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      '../../../Images/img1.png',
      '../../../Images/img2.png',
      '../../../Images/img3.png'
    ],
    indicatorDots: true,
    indicatorColor: 'rgba(255, 255, 255, 0.5)',
    indicatorActiveColor: 'rgba(255, 255, 255, 1)',
    date: '二月 18, 2018',
    title: '真是幸福的一天啊',
    content: '真是幸福的一天啊。我一直酣睡到第二天的 10 点才从床上爬起来，吃了一点儿牛奶和燕麦，感觉身体充满了活力。',
    location: '燕塘站, 广东省, 中国',
    mood: '88',
    like: false
  },

  /**
   * function
   */
  likeChange () {
    var current = this.data.like
    this.setData({
      like: !current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
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