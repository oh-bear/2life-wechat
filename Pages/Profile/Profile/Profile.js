// Pages/Profile/Profile/Profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    male: '../Images/male.png',
    female: '../Images/female.png',
    mood: 87,
    diary: 12,
    time: '10分钟前',
    user: {},
    partner: {},
    icon: [
      {
        book: '../Images/book_male.png',
        smile: '../Images/smile_male.png'
      },
      {
        book: '../Images/book_female.png',
        smile: '../Images/smile_female.png'
      }
    ],
    showMatch: false,
    hasAuthorize: false,
    showAgreement: false,
    agreement: ''
  },

  // method
  goMatch: function () {
    wx.navigateTo({
      url: '../Match/Match'
    })
  },

  goAnalysis: function () {
    wx.navigateTo({
      url: '../Analysis/Analysis',
    })
  },

  goSetting: function () {
    wx.navigateTo({
      url: '../Setting/Setting',
    })
  },

  goChart: function () {
    wx.navigateTo({
      url: '../Charts/Charts',
    })
  },

  goInfo: function () {
    wx.navigateTo({
      url: '../Info/Info',
    })
  },

  agreementViewHandler (e) {
    this.setData({
      showAgreement: e.currentTarget.dataset.handle
    })
  },

  agree () {
    this.setData({
      showAgreement: false
    })
  },

  login () {
    let _this = this
    getApp().wxLogin(true).then(data => {
      console.log(data)
      _this.setData({
        user: data.user,
        partner: data.partner,
        hasAuthorize: true,
      })
      wx.showToast({
        title: '登录成功',
      })
    }, err => {
      console.log(err)
      let title = ''
      if (err) {
        title = '登录失败'
      } else {
        title = '需先同意隐私条款'
      }
      wx.showToast({
        icon: 'none',
        title: title,
        complete () {
          if (!err) {
            _this.setData({
              showAgreement: true
            })
          }
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (getApp().data.hasAuthorize) return 
    let agreement = '# 双生日记隐私协议\n' + '双生日记尊重和保护用户的隐私，本隐私政策将告诉您我们如何收集和使用有关您的信息，以及我们如何保护这些信息的安全。\n' + '您在注册用户之前请务必仔细阅读本隐私条款，如同意，本隐私政策条款在您注册成为双生日记的用户后立即生效。\n' + '## 一、我们可能收集的用户信息\n' + '我们提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。\n' + '### 1、您提供的信息\n' + '- 您在注册账户或使用我们的服务时，向我们提供的相关个人信息，例如电话号码等；其中，如果您使用微信注册并登录，我们会采集您的微信账号头像、昵称、openid、性别、地区等信息。\n' + '您使用服务时我们可能收集如下信息：\n' + '- 日志信息，指您使用我们的服务时，系统可能通过 cookies 或其他方式自动采集的技术信息，包括：设备或软件信息，例如您的移动设备、或用于接入我们服务的其他程序所提供的配置信息、您的IP地址和移动设备所用的版本和设备识别码；以及您在使用我们服务时要求提供的其他信息和内容详情。\n' + '- 位置信息，指您开启设备定位功能并使用我们基于位置提供的相关服务时，收集的有关您位置的信息。您的位置信息仅用于我们给你发送天气预报信息，以及作为产品本身的用户画像统计，不会用于其他用途。您可以通过关闭定位功能，停止对您的地理位置信息的收集。\n' + '- 相册信息及摄像头权限，指您上传日志图片与头像时，需要获取相册权限与摄像头权限。\n' + '## 二、我们可能如何使用用户信息\n' + '- 在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途等，例如图片识别、文本识别，以便反色情、反涉政、反暴恐内容，确保我们向您提供的产品和服务的安全性；\n' + '- 日记数据可能用于作为无差别的机器学习的训练集，用于我们训练自研的NLP算法，以便为您提供更好的情绪分析服务；\n' + '- 帮助我们设计新服务，改善我们现有服务；\n' + '- 让您参与有关我们产品和服务的调查。\n' + '## 三、我们如何保护用户信息\n' + '我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露，例如使用严格的加密算法保护您的日记内容与个人信息。但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。\n' + '## 四、隐私政策的修改\n' + '由于法律法规的变更，以及为了与互联网的新发展和可能的发展趋势保持同步，我们可能会不定时修改本政策。因此，我们保留自行决定实施此类修改的权利，如该等修订造成您在本《隐私政策》下权利的实质减少，我们将在修订生效前通过在主页上显著位置提示或向您推送通知或以其他方式通知您。在该种情况下，若您继续使用我们的服务，即表示同意受经修订的本《隐私政策》的约束。\n'
    let data = getApp().towxml.toJson(agreement, 'markdown')
    this.setData({
      agreement: data,
      showAgreement: true
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
    let _this = this
    this.setData({
      hasAuthorize: getApp().data.hasAuthorize,
      showMatch: getApp().data.showMatch
    })
    if (!getApp().data.user.id) return
    getApp().getUser().then(data => {
      console.log(data)
      _this.setData({
        user: data.user,
        partner: data.partner
      })
    })
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