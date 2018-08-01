// Pages/Profile/Thanks/Thanks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team1: [
      {
        avatar: 'https://airing.ursb.me/2life/user/160/img_1533133620303.png-2life_note.jpg',
        name: '张锦涛',
        des: '心理学研究指导'
      },
      {
        avatar: 'https://airing.ursb.me/2life/user/160/img_1533133769799.png-2life_note.jpg',
        name: '林诗宁',
        des: '心理学研究助理'
      },
      {
        avatar: 'https://airing.ursb.me/2life/user/160/img_1533133800043.png-2life_note.jpg',
        name: '唐肆',
        des: '插画设计'
      },
      {
        avatar: 'https://airing.ursb.me/2life/user/160/img_1533133820816.png-2life_note.jpg',
        name: '兽爷',
        des: 'Logo 设计'
      }
    ],
    team2: ['CT', 'HHH', 'Noblevil', 'Ree', 'Sunki', '丁林', '杜肯坑', '二胡', '范宏䣭', '卡比兽', '卡比兽', '梁锐成', '刘盼盼', '林少燕', '马戈', '王子昂', '吴匡伦', '叶婉颖', '叶婉颖', '卓奇林', '朱国润']
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
    wx.setNavigationBarTitle({
      title: '鸣谢',
    })
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