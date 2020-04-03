##微信小程序地图组件和相机组件实现基于location的AR效果的尝试（失败）
---
> 最近无论AR还是微信小程序都是炒的火热。微信小程序的特点便是“无需安装，用完即走”，而我们所说的AR用在小程序上面感觉再适合不过了。虽然微信小程序已经开放了很多的接口，但现在还未入局AR。在此之前，想着利用微信小程序相机组件加上地图组件是否能实现AR的效果呢？于是我开始了我的尝试。
----
###一、相关组件以及API
&emsp;&emsp;在该过程中主要用到了两个组件，一个是相机组件，一个是地图组件。其中相机组件有什么不懂的可以参考我写的这篇文章:
[ 微信小程序相机组件的使用][325b3012]

  [325b3012]: http://blog.csdn.net/evan_love/article/details/78262602 "1"
  那么接下来我们一起来看一下这个map组件的使用。其实微信文档上面已经写得很详细了，下面罗列一下比较重要的。
- [微信小程序API 地图组件控制](https://www.w3cschool.cn/weixinapp/weixinapp-api-map.html)
- [微信小程序API 获取位置](https://www.w3cschool.cn/weixinapp/weixinapp-location.html)
- [微信小程序API 查看位置](https://www.w3cschool.cn/weixinapp/weixinapp-openlocation.html)
-

###二、设计流程图
&emsp;&emsp;根据以往尝试的经验，感觉地图组件的性质就是在Canvas组件上面通过一系列手段渲染出了一些画（包括点线面），这些画组成了地图，然后可以通过gps等手段实现定位等功能。（当然人家实现起来肯定是比较复杂的了，这个只是在下的想法，缺乏可靠性）。基于此，给出以下设计思路。<br>
![](http://pic.ioetake.com/18-2-5/80924920.jpg)<br>
###三、实施阶段
```··· 按照流程进行到了设置地图透明度为零这一步。请看代码···```
```JavaScript
Page({
  data: {
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/images/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
})
```
```然后是.WXML文件的代码```
```wxml
<!--index.wxml-->
<view class='container'>
   <camera id='myCamera' class='myCamera' device-position="back" flash="off" >
    <cover-image src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1678761496,1374097277&fm=11&gp=0.jpg' class='myimage'></cover-image>

<map id="map" class='myMap' longitude="113.324520" latitude="23.099994" scale="14" controls="{{controls}}" bindcontroltap="controltap" markers="{{markers}}" bindmarkertap="markertap" polyline="{{polyline}}" bindregionchange="regionchange" show-location style="width: 100%; height: 300px;"></map>
  </camera>
<!-- <map id="map" longitude="113.324520" latitude="23.099994" scale="14" controls="{{controls}}" bindcontroltap="controltap" markers="{{markers}}" bindmarkertap="markertap" polyline="{{polyline}}" bindregionchange="regionchange" show-location style="width: 100%; height: 300px;">
<camera id='myCamera' class='myCamera' device-position="back" flash="off" > </camera>

</map> -->
</view>
```
&emsp;&emsp;此时的运行结果如下所示：
![地图覆盖](http://pic.ioetake.com/18-2-5/59403904.jpg)<br>
<p>这个地图组件倒是可以覆盖到相机组件上面去了，但是和我预想的结果还是不一致。我原本想的是地图上面的出了makers之外其他的都应该被相机组件给覆盖了（以前试过在相机组件上面覆盖canvas,canvas被覆盖)，经过自己查找相关资料发现，地图组件和相机组件都具有最高层级，可以覆盖其他在其上面的组件。这也不难解释其可以覆盖canvas了，同时也可以得出以下结论：
_**当两个有最高层级的组件相互覆盖时，遵循互相嵌套原则，即嵌套在里面的有较高优先级，可以覆盖嵌套在外面的组件**_。

![](http://pic.ioetake.com/18-2-5/84527105.jpg)
###三、修改透明度以进行AR效果显示
&emsp;&emsp;然后，我又换了个思路：```先将Map组件的透明度设置为0，然后寻找一种办法在map上面cover-view一个cover-image（cover-image组件可以cover在所有组件之上），可以随着在地图上面设置的makers进行移动以实现定位的效果```首先设置Map的透明度为：
```
opacity: 0.1
```
结果如下图所示：<br>
![](http://pic.ioetake.com/18-2-5/96138286.jpg)
<br><br>enmmm,实现了改变map组件的透明度，但是看着makers的透明度也随着其变化了，这可不是我想看到的，于是这便成为了我的难题之一，哪位伙伴有想法的可以在下面留言我们一起进行探讨！正当我想着实现下一步的时候，想着真机测试一下吧，不测不知道，一侧吓一跳，```无论我怎样改变透明度的值，在真机测试的时候总是不能改变地图组件的透明度```这让我一度很郁闷，到目前为止还不知道错在哪里！
###四、遇到的问题
&emsp;&emsp;上面已经提到过了，下面总结一下：
- 当将透明度设置为0的时候maker也会进行消失，此时需要有一个东西可以将maker显示出来
- 在真机测试的时候，无法改变map的透明度
- 不知道怎样动态的设置maker，目前还停留在静态添加阶段

如果哪位朋友有什么想法，或者有其他可以实现基于地理位置的AR微信小程序的思路，欢迎在下方进行留言，大家一起共同探讨！另外，我已经将此次实验项目传至
- [我的码云](https://gitee.com/evani/WeiXinXiaoChengXuARChangShi)
- [我的CSDN](http://download.csdn.net/my)

<p>
欢迎大家查看下载。

五、参考文献<br>
【1】[微信小程序官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/map.html#map)<br>
【2】[W3cSchool微信小程序文档](https://www.w3cschool.cn/weixinapp/weixinapp-openlocation.html)
