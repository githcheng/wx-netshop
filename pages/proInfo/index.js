import {host} from '../../utils/params';
import {proLst} from '../../utils/public';
Page({
    data: {
        swiperImageUrls: [],
        truePrice:'',
        title:'',
        info:'',
        specLst:[], //规格参数
        id:'',
        attr:'',
        num:1,
        onePrice: '',
        morePrice:'',
        infoImageUrls:[],


        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        
    },
    
    onShareAppMessage() {
        return {
        title: this.data.title,
        desc: this.data.info,
        path: `/pages/proInfo/index?id=${this.data.id}`
        }
    },
    querySpec(e){
       const attr = e.currentTaget.dataset.value;
       this.queryInfo({attr:attr})
    },
    inputVl(e){
        const num = e.detail.value;
        this.howMorePri(num)
    },
    add(){
        const num = this.data.num+1;
      this.howMorePri(num)
        // this.queryInfo({monParam:'morePrice'})
    },
    cut(){
        if (this.data.num < 2) return;
         const num = this.data.num-1;
        this.howMorePri(num)
    },
    goOrder(){        
        wx.request({
                    url: `${rootUrl}/api/dbCart_action.php?act=addToCart&goods_id=${this.data.id}`,
                    method: 'GET',
                    data: {},
                    header: {
                        'Accept': 'application/json'
                    },
                    success: (res)=> {
                        console.log(res)
                    }
                })
        wx.navigateTo({
          url: `/pages/orders/index?num=${this.data.num}&id=${this.data.id}&attr=${this.data.attr}&onePrice=${this.data.onePrice}&morePrice=${this.data.morePrice}`
        })
    },
    howMorePri(num){
        this.setData({
                num:num,
                morePrice:num*this.data.onePrice
            });
    },
    queryInfo(id){
        wx.request({
                    url: `${host}/item/getItemById?id=${this.data.id}`,
                    method: 'POST',
                    data: {
                        'id':this.data.id
                    },
                    header: {
                        'Accept': 'application/json'
                    },
                    success:(res)=> {
                        console.log(res.data.data);
                        this.setData({
                            swiperImageUrls : res.data.data.swiperImageUrls,
                            infoImageUrls : res.data.data.infoImageUrls,
                            infoUrls : res.data.data.imgUrls,
                            truePrice : res.data.data.truePrice,
                            onePrice : res.data.data.onePrice,
                            specLst : res.data.data.specLst,
                            title :res.data.data.desc,
                        });
                    }
                })
    },
    onLoad(options) {
        this.setData({
            id:options.id
        })
        const params = proLst(options.id);
        this.setData(params) 
        this.queryInfo(options.id);
        wx.setNavigationBarTitle({title: this.data.title}); //标题 
    }
})