const order = require("../db/model/orderModel")

class OrderCtr{
    // 查找所有订单信息
    async find(ctx){
        let {page = 1 ,pageSize = 5} = ctx.query
        let allresult = await order.find()
        let orderList = await order.find().limit(Number(pageSize)).skip((page-1)*pageSize)
        ctx.body={code:0,
            orderList,
            allcount:allresult.length,
            msg:'查询ok'}
    }

    // 根据status检索订单 
    async searchStatus(ctx){
        let {page = 1 ,pageSize = 5,oStatus} = ctx.query
        let allresult = await order.find()
        let searchRes = await order.find({oStatus}).limit(Number(pageSize)).skip((page-1)*pageSize)
        ctx.body={code:0,
            searchRes,
            allcount:allresult.length,
            msg:'查询ok'}
    }

    // 审核订单状态
    async audioOrder(ctx){
        let {oStatus,oId} = ctx.request.body 
        let result = await order.findOneAndUpdate({oId},{oStatus})
        if(!result){ ctx.throw(404,'审核失败')}
        ctx.body={code:0,msg:'审核完成'}
    }

    // 根据订单号检索订单
    async SearchByoId(ctx){
        let {oId} = ctx.query
        let searchRes = await order.find({oId})
        ctx.body={code:0,
            searchRes,
            msg:'查询ok'}
    }



    


    // async find(ctx){
    //     let userList = await user.find()
    //     ctx.body={code:0,userList,msg:'查询ok'}
    // }

    // // 用户账号信息修改(账号解锁)
    // async unlock(ctx){
    //     let {_id,status}= ctx.request.body  
    //     let result = await user.findByIdAndUpdate({_id},{status})
    //     console.log(result)
    //     // if(!result){ ctx.throw(404,'管理员修改失败')}
    //     ctx.body={code:0,msg:'用户账号已解锁'}
    // }  
  }
  module.exports =new OrderCtr()
  