Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    position:'back',
    src:'',
    menus: [
      {
        "id": 1,
        "name": "转换",
        "url": '../../images/changephoto.png'
      
      },
      {
        "id": 2,
        "name": "拍照",
        "url": '../../images/takephoto.png'
      },
      {
        "id": 3,
        "name": "选图",
        "url": '../../images/xuantu.png'
        
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.camera']) {
          wx.authorize({
            scope: 'scope.camera',
            success() {
              // 用户已经同意小程序使用拍照功能，后续调用  接口不会弹窗询问
             console.log("授权成功")
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'normal',
      success: (res) => {
        console.log("拍照");
        this.setData({
          src: res.tempImagePath
        })
        /**
         * 设置缓存
         */
        console.log('开始保存')
        wx.setStorage({
          key: 'key1',
          data: this.data.src,
          success: function (res) {
            console.log('异步保存成功')
          }
        }),
        //获取缓存
          wx.getStorage({
            key: 'key1',
            success: function (res) {
              console.log(res.data)
            }
          })
        // wx.setStorageSync('key2', 'data2')
        // console.log('同步保存成功')
      
        /**
         * 预览图片
         */
        wx.previewImage({
          urls: [this.data.src],
        })
        /**
         * 在所拍照片上面显示预览界面
         */
        // wx.navigateTo({
        //   url: '../preview/preview?src='+res.tempImagePath,
        // })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    
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

  handleEvent:function(e){
    //console.log(this.data);

   var i=0;
   var that = this;     
   var dataset = e.target.dataset;//取得data的值
   var Index = dataset.index; //拿到是第几个数组
   console.log(Index)
   /**
    * 根据取得的Index的值进行相应的bind监听事件
    */
    if(Index==0){
      that.changeCamera();
    }else if(Index==1){
      
      that.takePhoto();
    }else if(Index ==2){
       that.chooseImage()
    }else{
      wx.showToast({
        title: '请重试！',
        icon: 'fail',
        duration: 2000
      })

    }
  
  // console.log(this.data.menus[1].id)
//console.log(this.data.menus.length)
    // if(that.data.menus.id==1){
    //   console.log("hhhhhhhh")
    // }else if(that.data.id==2){
    //   console.log("w")
    // }else if(that.data.menus.id==3){
    //   console.log("j")
    // }
    // for(i=0;i<that.data.menus.length;i++){
    //   console.log(that.data.menus[i].id)
    //   if(that.data.menus[i].id==1){
    //     console.log(that.data.menus[i].id)
    //     console.log("hhha");
    //     break;
    //   } else if (that.data.menus[i].id == 2){
    //     console.log(that.data.menus[i].id)
    //     console.log("wwww");
    //     break;
    //   }
    // }
  },

    /**
     * 转换摄像头
     */
    changeCamera: function () {
      var that = this;
      /**
       * 如果postion的值为back,就改为front,
       * 否则,改为back
       */
      if(that.data.position=="back"){
        that.setData({
          position: "front",
        })
      }else{
        that.setData({
          position: "back",
        })
      }
     
  },
  /**
   * 保存照片至手机并进行提示
   */
  // wx.saveImageToPhotosAlbum({
  //   filePath: '',
  //   success: function(res) {},
  //   fail: function(res) {},
  //   complete: function(res) {},
  // }),
  /**
   * 选图
   */
  chooseImage:function(res){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        wx.setStorageSync('src', tempFilePaths);
        wx.showModal({
          title: '提示',
          content: '是否立刻去涂鸦？',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.navigateTo({
                url: '../bgtuya/bgtuya?path= ' + tempFilePaths,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
              
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  }
})