// Pages/Home/Home/Home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month: '二月',
    year: '2018',
    day: '21',
    weatherImage: '../Images/sunny.png',
    temperature: '19℃',
    weatherText: '晴',
    data: [
      {
        date: '21',
        day: 'Sat',
        time: '15:24',
        location: '燕塘站, 广东省, 中国',
        title: '第一次和朋友们研究设计 app',
        description: '这是我的第一篇日记。今天，我吃了一个都城快餐，回来看了十几页书，并且做了必要的笔记…',
        image: ''
      },
      {
        date: '20',
        day: 'Fir',
        time: '19:04',
        location: '花都区, 广东省, 中国',
        title: '邓国雄是SB',
        description: '邓国雄是大傻逼',
        image: '../Images/diary_image.png'
      }
    ]
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