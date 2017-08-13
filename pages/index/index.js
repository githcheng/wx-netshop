//获取应用实例
var app = getApp()
import {rootUrl} from '../../utils/params'
import {host} from '../../utils/params'

Page({
    data: { 
      imgUrls: [  
            {  
                link:`/pages/proInfo/index?id=85`,  
                url:`${rootUrl}/images/upload/index_ppt_001.jpg` 
            },{  
                link:'/pages/proInfo/index?id=93',  
                url:`${rootUrl}/images/upload/index_ppt_003.jpg`  
            }   
        ],
      proLst:[
          {
              link:`/pages/proInfo/index?id=95`,  
                url:`${rootUrl}/images/upload/index_list_ban_095.jpg` ,
                text:'天杞园特殊膳食 科学 安全 有效 不反弹',
                title:'销售价￥198.00'
          }
      ],  
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        // loadingHidden: false,  // loading
        userInfo:'',
        userDate:''
    },
    onShareAppMessage() {
        return {
        title: '佰露集微商城',
        desc: '一个专卖良心商品的小网站',
        path: '/pages/index'
        }
    },
    onLoad(){
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo((userInfo)=>{
            // 更新数据
            this.setData({
                userInfo: userInfo
            })
        })
        
        wx.request({
            url: `${host}/index/getIndexTopList?type=1`,
            method: 'POST',
            data: {
                
            },
            header: {
                'Accept': 'application/json'
            },
            success: (res)=>{
                console.log(res);
                this.setData({
                    imgUrls: res.data.data,
                    loadingHidden:true
                })
            }
        })

        wx.request({
            url: `${host}/index/getIndexList`,
            method: 'POST',
            data: {
                type:0
            },
            header: {
                'Accept': 'application/json'
            },
            success: (res)=>{
                console.log(res);
                this.setData({
                    proLst: res.data.data,
                    loadingHidden:true
                })
            }
        })

    }
})
