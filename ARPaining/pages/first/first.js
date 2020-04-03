Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 生命周期函数--监听页面加载  
    showView: (options.showView == "true" ? true : false)
  }
  , onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    if (wx.createCameraContext()) {
      this.cameraContext = wx.createCameraContext('myCamera')
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }


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
    
  },
   /*
    * 点击按钮
   */
 show1: function () {
   wx.showActionSheet({
     itemList: ['进入全景', '查看优惠'],
     itemColor:'#0f0',
     success: function (res) {
       console.log(res.tapIndex)
     },
     fail: function (res) {
       console.log(res.errMsg)
     }
   })
  },
 show2: function () {
   wx.showActionSheet({
     itemList: ['进入全景', '查看优惠'],
     success: function (res) {
       console.log(res.tapIndex);
       if(res.tapIndex==0){
         wx.navigateTo({
           url: '../quanjing/quanjing',
         })
       }else if(res.tapIndex==1){
            wx.navigateTo({
              url: '../youhui/youhui',
            })
       }

       
     },
     fail: function (res) {
       console.log(res.errMsg)
     }
   })
 },
//  show3: function () {
//    wx.showModal({
//      title: '提示',
//      content: '这是一个模态弹窗',
//      success: function (res) {
//        if (res.confirm) {
//          console.log('用户点击确定')
//        } else if (res.cancel) {
//          console.log('用户点击取消')
//        }
//      }
//    })
//  },
show3:function(){
  wx.showActionSheet({
    itemList: ['进入全景', '查看优惠'],
    itemColor:'#f00',
    success: function (res) {
      console.log(res.tapIndex)
    },
    fail: function (res) {
      console.log(res.errMsg)
    }
  })
}

})