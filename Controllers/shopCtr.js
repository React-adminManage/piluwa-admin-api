const shop = require("../db/model/shopModel")

class ShopCtr{
    /**
     * 
     * @api {get} /shop/find 查找所有商品信息
     * @apiName 商品信息
     * @apiGroup shop
     * @apiVersion  1.0.0
     * 
     * @apiParam  {Number} [pageSize] 每页显示个数   默认5个
     * @apiParam  {Number} [page] 当前页数  默认第一页
     * 
     * @apiSuccess   {Number} code  状态码
     * @apiSuccess   {Array} shopList  商品信息数据
     * @apiSuccess   {String} msg  描述信息
     * 
     * @apiParamExample  {type} 例子:
     * {
     *    pageSize : 1
     *    page :  1
     * }
     * @apiSuccessExample {type} Success-Response:
    {
    "code": 0,
    "shopList": [
        {
        "imgArr": [
            "http://haitao.nosdn2.127.net/1bl7l6omn61_800_800.jpg?imageView&thumbnail=800x0&quality=85",
            "http://haitao.nosdn1.127.net/1bl7l6rcm29_800_800.jpg?imageView&thumbnail=800x0&quality=85",
            "http://haitao.nosdn2.127.net/1bl7l6pav88_800_800.jpg?imageView&thumbnail=800x0&quality=85"
        ],
        "_id": "5e4615a749ce98c41380de1f",
        "productId": "20005",
        "imgUrl": "http://haitao.nosdn2.127.net/1bl7l6omn61_800_800.jpg?imageView&thumbnail=800x0&quality=85",
        "title": "荷兰牛栏",
        "productName": "Nutrion荷兰牛栏 婴幼儿H.A半水解蛋白奶粉1段(0-6个月)750克/罐",
        "originalPrice": 269,
        "currentPrice": 119,
        "describe": "【有效期至2020-08-01】适度水解蛋白低敏配方，在每日所需基本营养配方的基础上，对牛奶蛋白进行部分水解。不含蔗糖及乙基香兰素：口味清淡，奶味香醇，宝宝更易接受。新老包装随机发货。",
        "standards": [
            {
            "standards": [
                "一段",
                "二段",
                "三段"
            ],
            "title": "阶段"
            }
        ],
        "count": 1,
        "type": "全球奶粉",
        "Status": 0
        }
    ],
    "allcount": 36,
    "msg": "查询ok"
    }
    */


    async find(ctx){
        // 默认一页显示5条数据,默认页数为第一页
        let {page = 1 ,pageSize = 5} = ctx.query

        let allresult = await shop.find()
        let shopList = await shop.find().limit(Number(pageSize)).skip((page-1)*pageSize)
        ctx.body={code:0,
            shopList,
            allcount:allresult.length,  //总条数
            msg:'查询ok'}
    }


    /**
     * 
     * @api {post} /shop/dupName 商品重名判断
     * @apiName 商品重名判断
     * @apiGroup shop
     * @apiVersion  1.0.0
     * 
     * 
     * @apiParam  {String} title  商品名
     * 
     * @apiSuccess   {Number} code  状态码
     * @apiSuccess   {String} msg  描述信息
     * 
     * @apiParamExample  {type} 例子:
     * {
     *    title : 雀巢
     * }
     * @apiSuccessExample {type} Success-Response:
    {
        "code": 404,
        "msg": "该商品已存在",
        "stack": "NotFoundError: 该商品已存在\n    at Object.throw (E:\\back-stage-management\\BE\\adminApi\\node_modules\\koa\\lib\\context.js:97:11)\n    at dupName (E:\\back-stage-management\\BE\\adminApi\\Controllers\\shopCtr.js:116:40)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
    }
    */


    async dupName(ctx){
        let {title} = ctx.request.body  //获取商品名
        console.log(title)
        let result =await shop.find({title})
        if(result.length!=0){ ctx.throw(404,'该商品已存在')}
        ctx.body={code:0,msg:'商品名可用'}
    }

    
    /**
     * 
     * @api {post} /shop/add 商品添加
     * @apiName 商品添加
     * @apiGroup shop
     * @apiVersion  1.0.0
     * 
     * @apiParam  {String} productId  商品Id
     * @apiParam  {String} Status  商品状态
     * @apiParam  {String} imgUrl  图片地址
     * @apiParam  {String} title  名字
     * @apiParam  {String} productName  标题
     * @apiParam  {String} originalPrice  标准价
     * @apiParam  {String} currentPrice 会员价
     * @apiParam  {String} describe  描述
     * @apiParam  {String} standards  规格
     * @apiParam  {String} count  库存
     * @apiParam  {String} type  商品类别
     * 
     * @apiSuccess   {Number} code  状态码
     * @apiSuccess   {String} msg  描述信息
     * 
     * @apiParamExample  {type} 例子:
    { 
        "productId":'112132',
        "Status":"1",
        "imgUrl" : "http://haitao.nosdn2.127.net/1bl7l6omn61_800_800.jpg?imageView&thumbnail=800x0&quality=85", 
        "title" : "荷兰牛栏1111", 
        "productName" : "Nutrion荷兰牛栏 婴幼儿H.A半水解蛋白奶粉1段(0-6个月)750克/罐", 
        "originalPrice" : 269, 
        "currentPrice" : 119,
        "describe" : "【有效期至2020-08-01】适度水解蛋白低敏配方，在每日所需基本营养配方的基础上，对牛奶蛋白进行部分水解。不含蔗糖及乙基香兰素：口味清淡，奶味香醇，宝宝更易接受。新老包装随机发货。", 
        "standards" : {
            "title" : "阶段", 
            "standards" : [
                "一段", 
                "二段", 
                "三段"
            ]
        }, 
        "count" :1,
        "type" : "全球奶粉"
    }
     * @apiSuccessExample {type} Success-Response:
    {
        "code": 0,
        "msg": "商品添加成功"
    }
    */

    async add(ctx){
        let {
            productId,imgUrl,title,productName,originalPrice,currentPrice,
            describe,standards,count,type,Status
        } = ctx.request.body
        let obj={
            imgUrl,title,productName,originalPrice,currentPrice,
            describe,standards,count,type,productId,Status
        }
        let result = await shop.insertMany(obj)
        if(!result){ ctx.throw(-1,'商品添加失败')}
        ctx.body ={code:0,msg:'商品添加成功'}
    }




     /**
     * 
     * @api {post} /shop/edit  商品修改
     * @apiName 商品修改
     * @apiGroup shop
     * @apiVersion  1.0.0
     * 
     * @apiParam  {String} _id  商品_id
     * @apiParam  {String} productId  商品Id
     * @apiParam  {String} Status  商品状态
     * @apiParam  {String} imgUrl  图片地址
     * @apiParam  {String} title  名字
     * @apiParam  {String} productName  标题
     * @apiParam  {String} originalPrice  标准价
     * @apiParam  {String} currentPrice 会员价
     * @apiParam  {String} describe  描述
     * @apiParam  {String} standards  规格
     * @apiParam  {String} count  库存
     * @apiParam  {String} type  商品类别
     * 
     * @apiSuccess   {Number} code  状态码
     * @apiSuccess   {String} msg  描述信息
     * 
     * @apiParamExample  {type} 例子:
    { 
        "productId":'112132',
        "Status":"1",
        "imgUrl" : "http://haitao.nosdn2.127.net/1bl7l6omn61_800_800.jpg?imageView&thumbnail=800x0&quality=85", 
        "title" : "荷兰牛栏1111", 
        "productName" : "Nutrion荷兰牛栏 婴幼儿H.A半水解蛋白奶粉1段(0-6个月)750克/罐", 
        "originalPrice" : 269, 
        "currentPrice" : 119,
        "describe" : "【有效期至2020-08-01】适度水解蛋白低敏配方，在每日所需基本营养配方的基础上，对牛奶蛋白进行部分水解。不含蔗糖及乙基香兰素：口味清淡，奶味香醇，宝宝更易接受。新老包装随机发货。", 
        "standards" : {
            "title" : "阶段", 
            "standards" : [
                "一段", 
                "二段", 
                "三段"
            ]
        }, 
        "count" :1,
        "type" : "全球奶粉"
    }
     * @apiSuccessExample {type} Success-Response:
    {
        "code": 0,
        "msg": "商品添加成功"
    }
    */

   async edit(ctx){
    let {
        _id,productId,imgUrl,title,productName,originalPrice,currentPrice,
        describe,standards,count,type,Status
    } = ctx.request.body
    let obj={
        imgUrl,title,productName,originalPrice,currentPrice,
        describe,standards,count,type,productId,Status
    }
    let result = await shop.findByIdAndUpdate(_id,obj)
    if(!result){ ctx.throw(-1,'商品添加失败')}
    ctx.body ={code:0,msg:'商品添加成功'}
}










    /**
     * 
     * @api {post} /shop/del 商品删除
     * @apiName 商品删除
     * @apiGroup shop
     * @apiVersion  1.0.0
     * 
     * 
     * @apiParam  {String} _id  商品的_id
     *
     * @apiSuccess   {Number} code  状态码
     * @apiSuccess   {String} msg  描述信息
     * @apiParamExample  {type} 例子:
        { 
            _id:5e7dfa7a53ed8914f8cc40a4
        }
     * @apiSuccessExample {type} Success-Response:
        {
            "code": 0,
            "msg": "商品删除成功"
        }
    */

    async del(ctx){  //根据_id删除商品
        let id= ctx.request.body._id
        console.log(id)
        let result =await  shop.findByIdAndDelete(id)
        if(!result){ ctx.throw(404,'商品删除失败')}
        ctx.body={code:0,msg:'商品删除成功'}
    }


     /**
     * 
     * @api {post} /shop/changeState 商品上下架
     * @apiName 商品上下架
     * @apiGroup shop
     * @apiVersion  1.0.0
     * 
     * 
     * @apiParam  {String} _id  商品的_id
     *
     * @apiSuccess   {Number} code  状态码
     * @apiSuccess   {String} msg  描述信息
     * @apiParamExample  {type} 例子:
        { 
            _id:5e4615a749ce98c41380de1f,
            Status:0
        }
     * @apiSuccessExample {type} Success-Response:
        {
            "code": 0,
            "msg": "修改商品上架状态"
        }
    */
    async changeState(ctx){  
        let {Status,_id} = ctx.request.body
        console.log(Status,_id)
        let result = await shop.findByIdAndUpdate({_id},{Status})
        if(!result){ ctx.throw(404,'商品修改失败')}
        ctx.body={code:0,msg:'修改商品上架状态'}
    } 





    /**
     * 
     * @api {post} /shop/FindById  商品查找根据_id
     * @apiName 商品查找根据_id
     * @apiGroup shop
     * @apiVersion  1.0.0
     * 
     * 
     * @apiParam  {String} _id  商品_id
     * 
     * @apiSuccess   {Number} code  状态码
     * @apiSuccess   {String} msg  描述信息
     * @apiSuccess   {Object} result  查询到的商品信息
     * 
     * 
     * @apiParamExample  {type} 例子:
     * {
     *    _id : 5e4615e449ce98c41380de40
     * }
     * @apiSuccessExample {type} Success-Response:
   {
  "code": 0,
  "msg": "查询成功",
  "result": {
    "imgArr": [
      "http://haitao.nosdn2.127.net/iuf2uiyf68_800_800.jpg?imageView&thumbnail=800x0&quality=85",
      "http://haitao.nos.netease.com/iuf2uie212_800_800.jpg?imageView&thumbnail=800x0&quality=85",
      "http://haitao.nosdn1.127.net/iuf2uimu13_800_800.jpg?imageView&thumbnail=800x0&quality=85"
    ],
    "_id": "5e4615e449ce98c41380de40",
    "productId": "10001",
    "imgUrl": "http://pop.nosdn.127.net/d7dba3b2-023e-4f68-8002-d754c0365bad?imageView&thumbnail=800x0&quality=85",
    "title": "花王妙而舒",
    "productName": "Merries 花王妙而舒 L54 纸尿裤/尿不湿",
    "originalPrice": 108,
    "currentPrice": 95,
    "describe": "日本原装进口腰贴式纸尿裤，专为9~14kg宝宝设计，温柔呵护宝宝娇嫩的小屁屁。点状设计，透气性更强；凹凸构造与防漏护围，紧紧锁定软便稀便不侧漏。备受亚洲妈妈青睐。",
    "standards": [
      {
        "standards": [
          "L"
        ],
        "title": "大小"
      }
    ],
    "count": 1,
    "type": "推荐分类",
    "Status": 1
  }
}
    */
   async getById(ctx){
        let {_id} = ctx.request.body  //获取商品_id
        let result =await shop.findById(_id)
        if(result.length==0){ ctx.throw(404,'商品不存在')}
        ctx.body={code:0,msg:'查询成功',result}
    }
}
module.exports =new ShopCtr()
  
