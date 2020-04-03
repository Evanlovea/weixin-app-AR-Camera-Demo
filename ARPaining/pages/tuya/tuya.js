//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pen: 3, //画笔粗细默认值
    color: '#cc0033', //画笔颜色默认值
    isPopping: false,//是否已经弹出  
    animPlus: {},//旋转动画  
    animCollect: {},//item位移,透明度  
    animTranspond: {},//item位移,透明度  
    animInput: {},//item位移,透明度  
    toolsActive: 0,
    isEraser: false,
    toolsIndex: 0,
    chooseColorPopShow: false,
    chooseWidthPopShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  startTakePhoto: function () {
    this.cameraContext.takePhoto({

    })
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
    return {
      title: 'title', // 分享标题  
      desc: 'desc', // 分享描述  
      path: 'path' // 分享路径  
    }  
  },
  pause: function () {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  /*testCavas */
  startX: 0, //保存X坐标轴变量
  startY: 0, //保存X坐标轴变量
  isClear: false, //是否启用橡皮擦标记
  //手指触摸动作开始
  touchStart: function (e) {
    //得到触摸点的坐标
    this.startX = e.changedTouches[0].x
    this.startY = e.changedTouches[0].y
    this.context = wx.createContext()

    if (this.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
      this.context.setStrokeStyle('#F8F8F8') //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果 
      this.context.setLineCap('round') //设置线条端点的样式
      this.context.setLineJoin('round') //设置两线相交处的样式
      this.context.setLineWidth(20) //设置线条宽度
      this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
      this.context.beginPath() //开始一个路径 
      this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true);  //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形 
      this.context.fill();  //对当前路径进行填充
      this.context.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
    } else {
      this.context.setStrokeStyle(this.data.color)
      this.context.setLineWidth(this.data.pen)
      this.context.setLineCap('round') // 让线条圆润 
      this.context.beginPath()

    }
  },
  //手指触摸后移动
  touchMove: function (e) {

    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y

    if (this.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画

      this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
      this.context.moveTo(this.startX, this.startY);  //把路径移动到画布中的指定点，但不创建线条
      this.context.lineTo(startX1, startY1);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      this.context.stroke();  //对当前路径进行描边
      this.context.restore()  //恢复之前保存过的坐标轴的缩放、旋转、平移信息

      this.startX = startX1;
      this.startY = startY1;

    } else {
      this.context.moveTo(this.startX, this.startY)
      this.context.lineTo(startX1, startY1)
      this.context.stroke()

      this.startX = startX1;
      this.startY = startY1;

    }
    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: this.context.getActions() // 获取绘图动作数组
    })
  },
  //手指触摸动作结束
  touchEnd: function () {

  },

  //保存图片
  saveImage: function () {

    this.setData({
      toolsActive: 0,
      isEraser: false,
      chooseColorPopShow: false,
      chooseWidthPopShow: false
    })
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res)
        wx.navigateTo({
          url: '../export_img/export_img?src=' + res.tempFilePath
        })
      }
    })
  },
 saveImg:function(){
   _this.setData({
     toolsActive: toolsIndex,
     isEraser: false,
     chooseColorPopShow: false,
     chooseWidthPopShow: false
   }, function () {
     _this.saveImage()
   })
 },
  //启动橡皮擦方法
  clearCanvas: function () {
    if (this.isClear) {
      this.isClear = false;
    } else {
      this.isClear = true;
    }
  },
  penSelect: function (e) { //更改画笔大小的方法
    console.log(e.currentTarget);
    this.setData({ pen: parseInt(e.currentTarget.dataset.param) });
    this.isClear = false;
  },
  colorSelect: function (e) { //更改画笔颜色的方法
    console.log(e.currentTarget);
    this.setData({ color: e.currentTarget.dataset.param });
    this.isClear = false;
  },
  //弹出动画
   //点击弹出  
    plus: function () {
    if (this.data.isPopping) {
      //缩回动画  
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画  
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },
  input: function () {
    console.log("input")
  },
  transpond: function () {
    console.log("transpond")
  },
  collect: function () {
    console.log("collect")
  },
  //弹出动画  
  popp: function () {
    //plus顺时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(180).step();
    animationcollect.translate(-100, -100).rotateZ(180).opacity(1).step();
    animationTranspond.translate(-140, 0).rotateZ(180).opacity(1).step();
    animationInput.translate(-100, 100).rotateZ(180).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  //收回动画  
  takeback: function () {
    //plus逆时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },  

})