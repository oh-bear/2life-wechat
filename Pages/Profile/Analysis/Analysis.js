// Pages/Profile/Analysis/Analysis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: false,
    finish: false,
    index: 0,
    subject: [
      {
        title: '分手时的想法是',
        a: '优柔寡断',
        b: '当断则断'
      },
      {
        title: '参加聚会时，你更喜欢',
        a: '坐在角落，默默观察大家',
        b: '和朋友一起坐在中央欢快地聊天游戏'
      },
      {
        title: '一个人在家待一整天，我会觉得',
        a: '安静舒适',
        b: '无聊难耐'
      },
      {
        title: '当一个目标完成之后',
        a: '会想再做点什么，满足自己的野心',
        b: '先歇一歇，或者等待新的目标出现'
      },
      {
        title: '面对一大堆的杂事，想把它做完',
        a: '尽量有组织、专注地做',
        b: '拖延症发作，常心不在焉'
      },
      {
        title: '在工作时，我通常',
        a: '专注于手头上的工作',
        b: '时不时看看外界消息'
      },
      {
        title: '面对一项任务，我倾向于',
        a: '得到正确的结果就好',
        b: '尝试用新的方法解决'
      },
      {
        title: '你更喜欢他人用哪种方式形容你',
        a: '严谨审慎',
        b: '创新求异'
      },
      {
        title: '观看辩论赛',
        a: '是很有趣的事情',
        b: '一群人吵来吵去'
      },
      {
        title: '在社交场合出糗的时候',
        a: '很尴尬，不想看到别人异样的眼光',
        b: '淡定自若，收拾好继续前行'
      },
      {
        title: '当我有工作需要做的时候',
        a: '我比较难主动开始工作',
        b: '我会按照计划主动开始工作'
      },
      {
        title: '当我和朋友在线上聊天时，ta突然没有回复我了，我通常',
        a: '敏感地觉得是不是说了什么不合适的话',
        b: '觉得ta可能有事突然离开了'
      }
    ]
  },

  start () {
    this.setData({
      start: true
    })
  },

  chooseAnswer (e) {
    if (this.data.index >= this.data.subject.length - 1) {
      this.setData({
        finish: true
      })
      true
    }
    this.setData({
      index: this.data.index + 1
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