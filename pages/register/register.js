//register.js
// 引入SDK核心类
var amapFile = require('../../libs/amap-wx.js');

Page({
  data: {
    sex: ['失物', '拾物'],
    category: ['校园卡', '电子产品', '文具', '衣物', '包'],
    tips:{},
    place:'',  
    contact:'',
  index_sex: 0,
  index_cat: 0,
  date: '2018-06-01',
  index_place: [0, 0],
  },

  // 物品性别选择
  bindPickerChange_sex: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index_sex: e.detail.value
    })
  },

  // 物品类别选择
  bindPickerChange_cat: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index_cat: e.detail.value
    })
  },

  // 物品时间选择
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  // 位置输入，自动联想补全
  bindKeyInput_place: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var key = '392b9ab34ad4ab901c6b5c8e388c261a';
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '上海交通大学',
      city: '上海',
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }

      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var url = '../register/register?keywords=' + keywords;
    console.log(url)
    wx.redirectTo({
      url: url
    })
  },
  bindSelect: function (e) {
    var keywords = e.currentTarget.dataset.keywords;
    var location = e.currentTarget.dataset.location;// || '-1,-1';
    this.setData({
      place: keywords,
      tips: {}
    })
  },

  // 联系方式输入
  bindKeyInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  submit: function (e) {
    console.log(e.detail.value);
    wx.request({  
      url: 'https://URL',
      data: e.detail.value,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      // header: {}, // 设置请求的 header
      success: function (res) {
      // success  
      if (res.data == 1) {  //请求成功返回码  
        wx.showToast({
          title: '物品登记成功',
          icon: 'success',
          duration: 2000
        })
        }
      }
    })
  }
})
