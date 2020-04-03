// pages/export_img/export_img.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: null,
    imageWidth: 0,
    imageHeight: 0,
    pageType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.getImageInfo({
      src: options.src,
      success: function (res) {
        wx.getSystemInfo({
          success: function (systemInfo) {
            systemInfo.windowWidth, systemInfo.windowHeight
            _this.setData({
              imageWidth: systemInfo.windowWidth,
              imageHeight: systemInfo.windowWidth * res.height / res.width,
              imageSrc: res.path,
              pageType: options.type
            })
          }
        })
      }
    })
  },

  saveImage: function () {
    var _this = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              _this.saveImageToPhotosAlbum()
            }
          })
        } else {
          _this.saveImageToPhotosAlbum()
        }
      }
    })
  },

  saveImageToPhotosAlbum: function () {
    var _this = this
    wx.saveImageToPhotosAlbum({
      filePath: _this.data.imageSrc,
      success: function (res) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '保存失败',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },

  onShareAppMessage: function (res) {
    var _this = this
    return {
      title: '随手涂鸦',
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509118620312&di=20b25bad25b29248202113b10350dc8b&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20151030%2FImg424676102.jpg',
      path: '../tuya/tuya',
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  createBoard: function () { 
    wx.redirectTo({
      url: '../tuya/tuya'
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