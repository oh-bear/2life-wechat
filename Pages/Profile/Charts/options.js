let chart = {
  title: {
    show: false
  },
  legend: {
    show: false
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    data: ['1', '2', '3', '4', '5', '6', '7']
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#DDF3E5'
      }
    },
    min: 0,
    max: 100
  },
  series: [{
    data: [0, 0, 0, 0, 0, 0, 0],
    type: 'bar',
    itemStyle: {
      color: '#2DC3A6',
      barBorderRadius: 10
    },
    barWidth: 10
  }]
}

let pie = {
  title: {
    text: '情绪饼状图',
    textStyle: {
      color: '#AAAAAA',
      fontSize: 12,
      align: 'center'
    },
    left: 'center',
    bottom: 0
  },
  legend: {
    type: 'plain',
    orient: 'vertical',
    top: '25%',
    right: '12.8%',
    data: [
      {
        name: '积极情绪',
        icon: 'circle',
        textStyle: {
          fontSize: '16',
          color: '#333333'
        }
      },
      {
        name: '一般情绪',
        icon: 'circle',
        textStyle: {
          fontSize: '16',
          color: '#333333'
        }
      },
      {
        name: '消极情绪',
        icon: 'circle',
        textStyle: {
          fontSize: '16',
          color: '#333333'
        }
      }
    ]
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['27%', '50%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        {
          value: 335,
          name: '积极情绪',
          itemStyle: {
            color: '#2DC3A6'
          }
        },
        {
          value: 335,
          name: '一般情绪',
          itemStyle: {
            color: '#FAA755'
          }
        },
        {
          value: 335,
          name: '消极情绪',
          itemStyle: {
            color: '#F54E4E'
          }
        },
      ]
    }
  ]
}

let radar = {
  title: {
    text: '五维情绪雷达图',
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
      { text: '喜悦', max: 0 },
      { text: '愤怒', max: 0 },
      { text: '厌恶', max: 0 },
      { text: '低落', max: 0 },
      { text: '温和', max: 0 }
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
      name: '北京',
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

export default {
  chart: chart,
  pie: pie,
  radar: radar
}