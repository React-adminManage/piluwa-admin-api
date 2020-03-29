const order = require("../db/model/orderModel")

class OrderCtr{



    /**
   * 
   * @api {get} order/find 查询所有订单
   * @apiName 订单信息
   * @apiGroup order
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {Number} [pageSize] 每页显示个数   默认5个
   * @apiParam  {Number} [page] 当前页数  默认第一页
   * 
   * @apiSuccess   {Number} code  状态码
 
   * @apiSuccess   {String} msg  描述信息
   * 
   * @apiParamExample  {type} 例子:
   * {
   *    pageSize : 1
   *    page :  1
   * }
   * 
   * 
   * @apiSuccessExample {type} Success-Response:
   * {
  
  * }
  * 
  * 
  */
    async find(ctx){ //多条件查询所有
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


  /**
   * 
   * @api {get} order/searchStatus 订单状态检索
   * @apiName 订单状态检索
   * @apiGroup order
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {Number} [pageSize] 每页显示个数   默认5个
   * @apiParam  {Number} [page] 当前页数  默认第一页
   * 
   * @apiSuccess   {Number} code  状态码
 
   * @apiSuccess   {String} msg  描述信息
   * 
   * @apiParamExample  {type} 例子:
   * {
   *    pageSize : 1
   *    page :  1
   * }
   * 
   * 
   * @apiSuccessExample {type} Success-Response:
   * {
  
  * }
  * 
  * 
  */
    // 根据status检索订单  多条件
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



  /**
   * 
   * @api {post} order/audioOrder 审核订单
   * @apiName 审核订单
   * @apiGroup order
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {Number} [pageSize] 每页显示个数   默认5个
   * @apiParam  {Number} [page] 当前页数  默认第一页
   * 
   * @apiSuccess   {Number} code  状态码
 
   * @apiSuccess   {String} msg  描述信息
   * 
   * @apiParamExample  {type} 例子:
   * {
   *    pageSize : 1
   *    page :  1
   * }
   * 
   * 
   * @apiSuccessExample {type} Success-Response:
   * {
  
  * }
  * 
  * 
  */
    // 审核订单
    async audioOrder(ctx){
        let {oStatus,oId,auditRes} = ctx.request.body 
        let result = await order.findOneAndUpdate({oId},{oStatus,auditRes})
        if(!result){ ctx.throw(404,'审核失败')}
        ctx.body={code:0,msg:'审核完成'}
    }


/**
   * 
   * @api {post} order/SearchByoId 订单号检索
   * @apiName 订单号检索
   * @apiGroup order
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {Number} [pageSize] 每页显示个数   默认5个
   * @apiParam  {Number} [page] 当前页数  默认第一页
   * 
   * @apiSuccess   {Number} code  状态码
 
   * @apiSuccess   {String} msg  描述信息
   * 
   * @apiParamExample  {type} 例子:
   * {
   *    pageSize : 1
   *    page :  1
   * }
   * 
   * 
   * @apiSuccessExample {type} Success-Response:
   * {
  
  * }
  * 
  * 
  */
    // 根据订单号检索订单
    async SearchByoId(ctx){
        let {oId} = ctx.query
        let searchRes = await order.find({oId})
        ctx.body={code:0,
            searchRes,
            msg:'查询ok'}
    }



    // 多条件模糊查询
    async mutilquery(ctx){
      let {pageSize=5,page=1}=ctx.request.body;
      let {oId,oUser,oStatus} = ctx.request.body;
      console.log(oId,oUser)
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


    
  }
  module.exports =new OrderCtr()
  
