const order = require("../db/model/orderModel")

class OrderCtr{


    async find(ctx){ //多条件查询所有订单
            let {page = 1 ,pageSize = 5,oId,oUser} = ctx.request.body
            var regUser = new RegExp(oUser, "i");
            var regId = new RegExp(oId, "i");
            var _filter = {
              //多字段匹配
              $and: [
               {oUser: {$regex: regUser}},
               {oId: {$regex: regId}},
              ]
             }
             let allresult = await order.find(_filter)
             let orderList = await order.find(_filter).limit(Number(pageSize)).skip((page-1)*pageSize)
             ctx.body={code:0,
                orderList,
                allcount:allresult.length,
                msg:'查询ok'
              }
    }


    // 多条件查询类别订单
    async searchStatus(ctx){
   
        let {page = 1 ,pageSize = 5,oStatus,oId,oUser} = ctx.request.body
        var regUser = new RegExp(oUser, "i");
        var regId = new RegExp(oId, "i");
        var _filter = {
          //多字段匹配
          $and: [
           {oUser: {$regex: regUser}},
           {oId: {$regex: regId}},
           {oStatus:oStatus}
          ]
         }
         let allresult = await order.find(_filter)
         let orderList = await order.find(_filter).limit(Number(pageSize)).skip((page-1)*pageSize)
         ctx.body={code:0,
            orderList,
            allcount:allresult.length,
            msg:'查询ok'
          }
    }


    // 显示所有的待审核订单
    async audioFind(ctx){
      let result = await order.find({oStatus:'4'})
      ctx.body={code:0,
        result,
        allcount:result.length,
        msg:'查询ok'
      }
    }


    // 审核订单
    async audioOrder(ctx){
        let {oStatus,oId,auditRes,audioAdmin,updateTime} = ctx.request.body 
        let result = await order.findOneAndUpdate({oId},{oStatus,auditRes,audioAdmin,updateTime})
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
  }
  module.exports =new OrderCtr()
  
