var getTime = require("../../utils/getTime.js")
var QR = require("../../utils/qrcode.js");
var HASH = require("../../utils/hash.js");
Page({
  data:{
    info:"",
    maskHidden:true,
    imagePath:"",//准备临时缓存图片路径
    time:"wrong",
    timeNum: 0 ,
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var appInstance = getApp()
    var size = this.setCanvasSize() //动态设置画布大小
    var initUrl = this.data.info
    var that = this;//用this不行，为啥，是为了安全么？
    setInterval(function (){
      that.setData({
        time:getTime.formatTime(new Date()),
      });
      var newTime = getTime.timeNum(new Date())
      //console.log(that.data.timeNum)
      //console.log(newTime)
      if(that.data.timeNum !=newTime ){that.showQR()};
      that.setData({
        timeNum : newTime,
      });
      appInstance.globaldata.userPosition = 1;
      
    },1000)
    this.showQR()
  },

  onHide:function(options){

  },

jumpToIntro:function(){
  wx.redirectTo({
    url: '/pages/introduction/introduction',
  })
},

jumpToChange:function(){
  wx.redirectTo({
    url: '/pages/changePassword/changePassword',
  })
},
//获取当前时间
getTime:function(){},
//获取用户微信号
getName:function(){},
//获取用户口令,如果不用服务器或者本地存储口令就不需要
getPassword:function(){},
//256位哈希值的生成
makeHash:function(){},

//生成画布大小
setCanvasSize: function () {
  var size = {};
  try {
    var res = wx.getSystemInfoSync();
    var scale = 750 / 687; //不同屏幕下canvas的适配比例；设计稿是750宽
    var width = res.windowWidth / scale;
    var height = width; //canvas画布为正方形
    size.w = width;
    size.h = height;
  } catch (e) {
    // Do something when catch error
    console.log("获取设备信息失败" + e);
  }
  //console.log(size);
  return size;
},

//调用接口生成二维码
createQrCode: function (content, canvasId, cavW, cavH) {
  //调用插件中的draw方法，绘制二维码图片
  //this.canvasToTempImage 为绘制完成的回调函数，可根据自己的业务添加
  QR.api.draw(content, canvasId, cavW, cavH, this, this.canvasToTempImage);
},

//获取临时缓存图片路径，存入data中
canvasToTempImage: function () {
  var that = this;
  wx.canvasToTempFilePath({
    canvasId: 'mycanvas',
    success: function (res) {
      var tempFilePath = res.tempFilePath;
      console.log(tempFilePath);
      that.setData({
        imagePath: tempFilePath,
      });
    },
    fail: function (res) {
      console.log(res);
    }
  }, that);
},


showQR:function(){
  var that = this;
  this.makeInfo();
  var url = that.data.info;
  this.setData({
    time:getTime.formatTime(new Date()),
  })
  that.setData({
    maskHidden: false,
  });
  
  wx.showToast({
    title: '生成中...',
    icon: 'loading',
    duration: 100
  });
  var st = setTimeout(function () {
    var size = that.setCanvasSize();
    //绘制二维码
    that.createQrCode(url, "mycanvas", size.w, size.h);
    
    that.setData({
      maskHidden: true
    });
    clearTimeout(st);
  }, 100)
},

makeInfo:function(){
  var beforeHash = wx.getStorageSync('user_password')+getTime.timeNum(new Date);
  var result = HASH.sha256(beforeHash);
  var nameAndHash = result+wx.getStorageSync('user_name');
  console.log(beforeHash)
  this.setData({
    info : nameAndHash,
  })
  console.log(this.data.info)
}

})