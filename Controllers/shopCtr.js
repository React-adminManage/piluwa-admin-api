const shop = require("../db/model/shopModel")

class ShopCtr{
    // 查找所有商品
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

    // 商品重名判断
    async dupName(ctx){
        let {title} = ctx.request.body  //获取商品名
        console.log(title)
        let result =await shop.find({title})
        if(result.length!=0){ ctx.throw(404,'该商品已存在')}
        ctx.body={code:0,msg:'商品名可用'}
    }

    // 商品添加
    async add(ctx){
        let {
            imgUrl,title,productName,originalPrice,currentPrice,
            describe,standards,count,type
        } = ctx.request.body
        let obj={
            imgUrl,title,productName,originalPrice,currentPrice,
            describe,standards,count,type
        }
        let result = await shop.insertMany(obj)
        if(!result){ ctx.throw(-1,'商品添加失败')}
        ctx.body ={code:0,msg:'商品添加成功'}
    }


    // 商品删除
    async del(ctx){  //根据_id删除商品
        let id= ctx.request.body._id
        console.log(id)
        let result =await  shop.findByIdAndDelete(id)
        if(!result){ ctx.throw(404,'商品删除失败')}
        ctx.body={code:0,msg:'商品删除成功'}
    }

    // 商品上下架
    async changeState(ctx){  
        let {Status,_id} = ctx.request.body
        console.log(Status,_id)
        let result = await shop.findByIdAndUpdate({_id},{Status})
        if(!result){ ctx.throw(404,'商品修改失败')}
        ctx.body={code:0,msg:'商品修改成功'}
    } 
  }
  module.exports =new ShopCtr()
  