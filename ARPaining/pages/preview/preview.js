// pages/preview/preview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {

    //获取缓存信息
    wx.getStorage({
      key: 'key1',
      success: function(res) {
        console.log(res.data);
       
      },
    })
    wx.getStorageInfo({
      success: function(res) {
        console.log(res)
      },
    })
    var that=this;
    console.log(res)
    that.setData({
      src: res.data
    })
    // wx.previewImage({
    //   current: 'src', // 当前显示图片的http链接
    //   urls: [that.data.src] // 需要预览的图片http链接列表
    // })
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