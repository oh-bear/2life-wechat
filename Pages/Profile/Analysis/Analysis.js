// Pages/Profile/Analysis/Analysis.js
// init echart
import * as echarts from '../Echarts/echarts'
let chart = null

function initChart(chart, option) {
  chart.setOption(option)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    start: false,
    finish: false,
    index: 0,
    hasTested: true,
    subject: [
      {
        title: '分手时的想法是',
        a: '优柔寡断',
        b: '当断则断',
        score: {
          a: 1,
          b: 2
        }
      },
      {
        title: '参加聚会时，你更喜欢',
        a: '坐在角落，默默观察大家',
        b: '和朋友一起坐在中央欢快地聊天游戏',
        score: {
          a: 1,
          b: 2
        }
      },
      {
        title: '一个人在家待一整天，我会觉得',
        a: '安静舒适',
        b: '无聊难耐',
        score: {
          a: 1,
          b: 2
        }
      },
      {
        title: '当一个目标完成之后',
        a: '会想再做点什么，满足自己的野心',
        b: '先歇一歇，或者等待新的目标出现',
        score: {
          a: 1,
          b: 2
        }
      },
      {
        title: '面对一大堆的杂事，想把它做完',
        a: '尽量有组织、专注地做',
        b: '拖延症发作，常心不在焉',
        score: {
          a: 1,
          b: 2
        }
      },
      {
        title: '在工作时，我通常',
        a: '专注于手头上的工作',
        b: '时不时看看外界消息',
        score: {
          a: 1,
          b: 2
        }
      },
      {
        title: '面对一项任务，我倾向于',
        a: '得到正确的结果就好',
        b: '尝试用新的方法解决',
        score: {
          a: 2,
          b: 1
        }
      },
      {
        title: '你更喜欢他人用哪种方式形容你',
        a: '严谨审慎',
        b: '创新求异',
        score: {
          a: 2,
          b: 1
        }
      },
      {
        title: '观看辩论赛',
        a: '是很有趣的事情',
        b: '一群人吵来吵去',
        score: {
          a: 1,
          b: 2
        }
      },
      {
        title: '当有人与你发生争执，让你很抓狂时',
        a: '愿意放弃立场，恭顺他',
        b: '会为了自己的目的发生冲突',
        score: {
          a: 2,
          b: 1
        }
      },
      {
        title: '当别人有求于你',
        a: '先掂量自身能否帮到TA，再尝试帮忙',
        b: '认为会增加自己负担，会考虑多一些',
        score: {
          a: 2,
          b: 1
        }
      },
      {
        title: '和陌生人交往前，我倾向于',
        a: '持有信任的态度，偶尔被欺骗',
        b: '持有防备的态度，很少被欺骗',
        score: {
          a: 2,
          b: 1
        }
      },
      {
        title: '在社交场合出糗的时候',
        a: '很尴尬，不想看到别人异样的眼光',
        b: '淡定自若，收拾好继续前行',
        score: {
          a: 2,
          b: 1
        }
      },
      {
        title: '当我有工作需要做的时候',
        a: '我比较难主动开始工作',
        b: '我会按照计划主动开始工作',
        score: {
          a: 2,
          b: 1
        }
      },
      {
        title: '当我和朋友在线上聊天时，ta突然没有回复我了，我通常',
        a: '敏感地觉得是不是说了什么不合适的话',
        b: '觉得ta可能有事突然离开了',
        score: {
          a: 2,
          b: 1
        }
      }
    ],
    score: [],
    option: {
      title: {
        text: '五维情绪基准值',
        textStyle: {
          color: '#AAAAAA',
          fontSize: 12,
          align: 'center'
        },
        left: 'center',
        bottom: 0
      },
      radar: {
        indicator: [
          { text: '外向性', max: 0 },
          { text: '神经质', max: 0 },
          { text: '严谨性', max: 0 },
          { text: '开放性', max: 0 },
          { text: '宜人性', max: 0 }
        ],
        name: {
          textStyle: {
            color: '#333333',
            fontSize: 14
          }
        },
        center: ['50%', '50%'],
        radius: '70%',
        shape: 'circle'
      },
      series: [
        {
          type: 'radar',
          lineStyle: {
            normal: {
              width: 1,
              opacity: 0.5
            }
          },
          data: [
            {
              value: [0, 0, 0, 0, 0]
            }
          ],
          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#2DC3A6'
            }
          },
          areaStyle: {
            normal: {
              opacity: 0.2
            }
          }
        }
      ]
    }
  },

  start () {
    this.setData({
      start: true
    })
  },

  chooseAnswer (e) {
    let answerScore = e.currentTarget.dataset.score
    let score = this.data.score
    score.push(answerScore)
    this.setData({
      score
    })
    console.log(this.data.score)
    if (this.data.index >= this.data.subject.length - 1) {
      this.setData({
        finish: true
      })
    } else {
      this.setData({
        index: this.data.index + 1
      })
    }
  },

  end () {
    let score = this.data.score
    if (score.length !== this.data.subject.length) {
      wx.showToast({
        icon: 'none',
        title: '测试出错，请联系管理员!',
      })
      wx.navigateBack()
      return
    }
    let _this = this
    let { uid, timestamp, token } = getApp().data.key
    let data = { uid, timestamp, token }
    data.content = score.join(',')
    wx.showLoading({
      title: '正在计算',
      mask: true
    })
    wx.request({
      url: getApp().data.domain + 'users/calculate_emotion',
      method: 'POST',
      data: data,
      success (res) {
        console.log(res.data)
        let data = res.data.data
        _this.setData({
          hasTested: true
        })
        _this.showRadar(data.emotions_basis)
        let user = getApp().data.user
        user.emotions = data.emotions
        user.emotions_basis = data.emotions_basis
        user.emotions_type = data.emotions_type
        user.emotions_report = data.emotions_report
        getApp().data.user = user
      },
      fail (err) {
        console.log(err)
      },
      complete () {
        wx.hideLoading()
      }
    })
  },

  showRadar(data) {
    this.radarComponent = this.selectComponent('#mychart-dom-bar')
    let option = this.data.option
    let emotions = data.split(',')
    let max = Math.max.apply(null, emotions) * 1.1
    let indicator = option.radar.indicator
    getApp().lodash.forEach(indicator, val => { val.max = max })
    option.indicator = indicator
    option.series[0].data[0].value = emotions
    
    console.log(this.radarComponent)
    this.radarComponent.init((canvas, width, height) => {
      const radar = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      initChart(radar, option)
      this.radar = radar

      return radar
    })
  },

  goAdd () {
    wx.navigateTo({
      url: '/Pages/Home/Add/Add',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '量表测试',
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
    let user = getApp().data.user
    this.setData({
      hasTested: user.emotions ? true : false
    })
    if (user.emotions) {
      this.showRadar(user.emotions_basis)
    }
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