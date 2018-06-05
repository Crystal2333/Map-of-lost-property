//index.js
// 引入SDK核心类
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

//获取应用实例
const app = getApp()

var markersData = [];
Page({
  //数据信息
  data: {
    markers:[],
    latitude: '',
    longitude: '',
    textData: {},
    //city: ''
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    //that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  //页面加载事件
  onLoad: function (e) {
    var that = this;
    //初始化地图接口
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key:key});
    var params={
      iconPathSelected:'../../icons/地图深.png',
      iconPath:'../../icons/定位.png',
      success: function(data){
        markersData=data.markers;
        var poisData = data.poisData;
        var markers_new = [];
        markersData.forEach(function (item, index) {
          markers_new.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: item.iconPath,
            width:40,
            height:40
            //width: item.width,
            //height: item.height
          })
        })
        if (markersData.length > 0) {
          that.setData({
            markers: markers_new
          });
          /*that.setData({
            city: poisData[0].cityname || ''
          });*/
          that.setData({
            latitude: markersData[0].latitude
          });
          that.setData({
            longitude: markersData[0].longitude
          });
          //that.showMarkerInfo(markersData, 0);
        } else {
          wx.getLocation({
            type: 'gcj02', //坐标系统种类
            success: function (res) {
              that.setData({
                latitude: res.latitude
              });
              that.setData({
                longitude: res.longitude
              });
            },
            fail: function () {
              that.setData({
                latitude: 31.025670
              });
              that.setData({
                longitude: 121.43645
              });
            }
          })

          that.setData({
            textData: {
              name: '抱歉，未找到结果',
              desc: ''
            }
          });
        }

      },
      fail: function (info) {
        wx.showModal({title:info.errMsg})
      }
    }
    if (e && e.keywords) {
      params.querykeywords = e.keywords;
    }
    myAmapFun.getPoiAround(params)
  },
  //显示marker信息
  /*showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },*/
  //选中将改变颜色
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../icons/地图深.png";
      } else {
        data[j].iconPath = "../../icons/定位.png";
      }
      markers.push({
        id: data[j].id,
        latitude: data[j].latitude,
        longitude: data[j].longitude,
        iconPath: data[j].iconPath,
        width:40,
        height:40
        //width: data[j].width,
        //height: data[j].height
      })
    }
    that.setData({
      markers: markers
    });
  }

})