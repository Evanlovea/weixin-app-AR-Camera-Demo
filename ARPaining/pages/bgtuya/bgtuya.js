

// 获取全局应用程序实例对象
const app = getApp();
var ctx = null;

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "index",
 
  /**
   * 页面的初始数据
   */

  data: {
    path:'https://wx3.sinaimg.cn/mw690/006hyGWCly1fnjv2qv06sj30iq0acgtj.jpg',
    showBgSet: false,
    showPenSet:false,

    //是否开启橡皮擦
    isClear: false, 

    defaultBgColor: '',
    defaultPenColor: '#000000',

    //画布背景颜色数据
    canvasBgData:{
      canvasBgColor: "",
      colors: ['#000000', '#434343', '#666666', '#cccccc', '#e3e3e3', '#ffffff', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff']
    },
    //画笔数据
    
    penData: {
      penSize: 5,
      color: '#000000',
      colors: ['#000000', '#434343', '#666666', '#cccccc', '#e3e3e3', '#ffffff', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff']
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    // console.log(options.path)
    // var that=this;
    // that.setData({
    //   path: options.path
    // })
    var imgsrc = (wx.getStorageSync('src') || []);
    console.log(imgsrc);
    this.setData({
      path:imgsrc
    })
    this.initCanvas();
  },

  /**
   * 加载画布
   */
  initCanvas(){
    ctx = wx.createCanvasContext('myCanvas')
    ctx.setLineCap('round')
    ctx.setLineJoin('round')
   // ctx.setGlobalAlpha(0.2)
  },

  resetColor(){
    var bg = this.data.canvasBgData;
    bg.canvasBgColor = this.data.defaultBgColor;
    var pen = this.data.penData;
    pen.color = this.data.defaultPenColor;
    pen.penSize = 5;

    this.setData({
      showBgSet: false,
      showPenSet: false,
      isClear: false, 
      canvasBgData: bg,
      penData: pen
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady :function(res) {
    // var that=this;
    // that.setData({
    //   path: that.data.path
    // })
    // 创建相机组件
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
  onShow:function(options) {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '涂鸦',
      path: 'pages/bgtuya/bgtuya',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  
  //画图事件

  pointData:{
    begin_x:0,
    begin_y:0,
    end_x:null,
    end_y:null,
  },
  
 

  start: function (e) {
    var that = this;
    that.setData({
      showBgSet: false,
      showPenSet: false,
    });
    that.pointData.begin_x = e.touches[0].x;
    that.pointData.begin_y = e.touches[0].y;
  
    if (that.data.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
      ctx.setStrokeStyle(that.data.canvasBgData.canvasBgColor); //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果
      ctx.setLineCap('round'); //设置线条端点的样式
      ctx.setLineJoin('round'); //设置两线相交处的样式
      ctx.setLineWidth(20); //设置线条宽度
      ctx.save();  //保存当前坐标轴的缩放、旋转、平移信息
      ctx.beginPath(); //开始一个路径
      ctx.arc(that.pointData.begin_x, that.pointData.begin_y, 5, 0, 2 * Math.PI, true);  //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形
      ctx.fill();  //对当前路径进行填充
      ctx.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
    } else {
      ctx.setStrokeStyle(that.data.penData.color);
      ctx.setLineWidth(that.data.penData.penSize);
      ctx.setLineCap('round'); // 让线条圆润
      ctx.beginPath();
    }
    ctx.moveTo(that.pointData.begin_x, that.pointData.begin_y);
    ctx.lineTo(that.pointData.begin_x, that.pointData.begin_y);
    ctx.stroke();
    ctx.draw(true);
  },
  move: function (e) {
    var that = this;
    if (that.data.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
      ctx.save();  //保存当前坐标轴的缩放、旋转、平移信息
      ctx.moveTo(that.pointData.begin_x, that.pointData.begin_y);  //把路径移动到画布中的指定点，但不创建线条
      ctx.lineTo(e.touches[0].x, e.touches[0].y);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      ctx.stroke();  //对当前路径进行描边
      ctx.restore()  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
    } else {
      ctx.moveTo(that.pointData.begin_x, that.pointData.begin_y);  //把路径移动到画布中的指定点，但不创建线条
      ctx.lineTo(e.touches[0].x, e.touches[0].y);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      ctx.stroke();  //对当前路径进行描边
    }
    ctx.draw(true);
    that.pointData.begin_x = e.touches[0].x;
    that.pointData.begin_y = e.touches[0].y;
  },
  end: function (e) {
   
  },

  //以下为自定义点击事件
  openBgSet:function(){
    this.setData({
      showBgSet:true,
      isClear: false
    })
  },
  setBgColor:function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '设置背景将清空画布',
      success: function (res) {
        if (res.confirm) {
          var color = e.target.dataset.color;
          that.data.canvasBgData.canvasBgColor = color;
          ctx.rect(0, 0, 1000, 2000);
          ctx.setFillStyle(color);
          ctx.fill();
          ctx.draw();
        } 
        that.setData({
          showBgSet: false
        })
      }
    })
  },


  openPenSet: function () {
    this.setData({
      showPenSet: true,
      isClear: false
    })
  },
  
  setPenSize:function(e){
    var data = this.data.penData;
    data.penSize = e.detail.value;
    this.setData({
      penData: data
    })
  },
  setPenColor:function(e) {
    this.data.penData.color = e.target.dataset.color;
    this.setData({
      showPenSet: false
    })
  },


  openErraserSet: function () {
    this.setData({
      isClear: !this.data.isClear
    })
  },
  
  clearAll: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认清除画板所有内容', 
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          ctx.draw();
          that.resetColor();
        }   
      }
    })
  },
  /**
   * 保存自己所绘制的涂鸦
   */


  //保存图片
  saveImage: function () {

    this.setData({
      showBgSet:false,
      isClear: false,
     showPenSet:false
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
  saveCanvas: function () {
    this.setData({
      //toolsActive: toolsIndex,
      isClear: false,
      // chooseColorPopShow: false,
      // chooseWidthPopShow: false
    } )
      this.saveImage()
  
  },
})

