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
    var appInstance = getApp()
    console.log(e.detail.value) 
    if(e.detail.value.name ==="")
      {appInstance.globalData.name=wx.getStorageSync('user_name')}
    else 
      appInstance.globalData.name=e.detail.value.name
    appInstance.globalData.password=e.detail.value.password
    console.log(appInstance.globalData) 

    try {
      wx.setStorageSync('user_name',appInstance.globalData.name )
      wx.setStorageSync('user_password', appInstance.globalData.password)
  } catch (e) {    
  }
    this.jumpToQR();
  },

  jumpToQR:function(){
    wx.redirectTo({
      url: '/pages/QRcode/QRcode',
    })
  },
})