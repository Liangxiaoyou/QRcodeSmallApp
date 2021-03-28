Page({
jumpToIntro:function(){
  wx.navigateTo({
    url: '/pages/introduction/introduction',
  })
},

jumpToChange:function(){
  wx.navigateTo({
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
//调用接口生成二维码
})