
module.exports={
    '0': [
              { resources:'/order',name:"订单操作", permissions: ['get','post'] },
              { resources:'/shop',name:"商品操作", permissions: ['get','post'] },
              { resources:'/admin',name:"管理员操作", permissions: ['get'] },
              { resources:'/user',name:"用户操作", permissions: ['get'] },
              { resources:'/type',name:"类别操作", permissions: ['get'] },
            ],
    '1': [     
              { resources:'/order',name:"订单操作", permissions: ['get',"post","put","delete"] },
              { resources:'/shop',name:"商品操作", permissions: ['get',"post","put","delete"] },
              { resources:'/admin',name:"管理员操作", permissions: ['get',"post","put","delete"] },
              { resources:'/user',name:"用户操作", permissions: ['get',"post","put","delete"] },
              { resources:'/type',name:"类别操作", permissions: ['get',"post","put","delete"] },



              // { resources:'/admin',name:"管理员操作", permissions: ['get',"post","put","delete"] },
              // { resources:'/goods',name:"商品操作", permissions: ['get',"post","put","delete"] },
              // { resources:'/banner',name:"轮播图操作", permissions: ['get',"post","put","delete"] },
              // { resources:'/kind',name:"商品类别操作", permissions: ['get',"post","put","delete"] },
              // { resources:'/goods',name:"商品操作", permissions: ['get',"post","put","delete"] },
              // { resources:'/upload',name:"文件操作操作", permissions: ['get',"post","put","delete"] }
          ]
  }
  
