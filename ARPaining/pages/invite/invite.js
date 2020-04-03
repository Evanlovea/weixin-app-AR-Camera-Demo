//var IMG_URL = '/image/ewm.png'
var IMG_URL=''
Page({
  data: {
    img_url: IMG_URL,
    scene: '' 
  },
  savePic: function () {

    wx.getImageInfo({
      src:'https://wx3.sinaimg.cn/mw690/006hyGWCly1fnjspoxsb8j31kw2dcnpf.jpg',
      success: function(ret){
        var path = ret.path;
        console.log(path)
        
        wx.saveImageToPhotosAlbum({
          filePath: path,
          
          success() {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail(){
            wx.showToast({
              title: '保存失败',
              icon: 'success',
              duration: 2000
            })
          }
        })

      }
    })
    
  },
  onShow: function () {
    // wx.getSetting({
    //   success(res) {
    //     console.log(res.authSetting)
    //     if (!res.authSetting['scope.writePhotosAlbum']) {
    //       wx.authorize({
    //         scope: 'scope.writePhotosAlbum',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })
    
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来体验一下吧！',
      path: '/page/invite?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
  
})
