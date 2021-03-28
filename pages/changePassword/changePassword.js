Page({
  data:{
    user_name:"",
    user_password:"",
  },
  onLoad:function(){
    console.log(wx.getStorageSync('user_name'))
    console.log(wx.getStorageSync('user_password'))
    this.setData({
      user_name:wx.getStorageSync('user_name'),
      user_password:wx.getStorageSync('user_password')
    })
  },
  formSubmit:function(e){
    console.log(e);

    var appInstance = getApp()
    appInstance.globalData.name=e.detail.value.name
    appInstance.globalData.password=e.detail.value.password
    console.log(appInstance.globalData) 

    try {
      wx.setStorageSync('user_name',e.detail.value.name )
      wx.setStorageSync('user_password', e.detail.value.password)
  } catch (e) {    
  }
    this.jumpToQR();
  },

  jumpToQR:function(){
    wx.navigateTo({
      url: '/pages/QRcode/QRcode',
    })
  },
})