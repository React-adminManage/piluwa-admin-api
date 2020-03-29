const user = require("../db/model/userModel")

class UserCtr{

/**
 * 
 * @api {get} /user/find 查找所有用户信息
 * @apiName 用户信息
 * @apiGroup user
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} [pageSize] 每页显示个数   默认5个
 * @apiParam  {Number} [page] 当前页数  默认第一页
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {Array} userList  用户信息数据
 * @apiSuccess   {Number} allcount  总条数
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
  "code": 0,
  "userList": [
    {
      "_id": "5e65eeb67507944adc42a519",
      "phone": "18352936365",
      "nickName": "6365",
      "password": "123456",
      "sex": 1,
      "avatarImg": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582618297039&di=c60f084304646b50740e3328ee4511b0&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F67%2F59%2F63%2F58e89bee922a2.png",
      "token": "123213123123",
      "status": 1,
      "address": [
        {
          "_id": "5e6da790de41693a44d7b4f5",
          "getName": "胡冰",
          "getPhone": "XXX",
          "address": "北京市 北京市 东城区 -XXXXX",
          "status": "1"
        },
        {
          "_id": "5e6da81fde41693a44d7b4f7",
          "getName": "XXXX",
          "getPhone": "XXXXXXXXXXXXXXXX",
          "address": "北京市 北京市 东城区 -XXXX",
          "status": "0"
        }
      ],
      "__v": 0
    }
  ],
  "allcount": 2,
  "msg": "查询ok"
 * }
 * 
 * 
 */
    async find(ctx){
        let {page = 1 ,pageSize = 5} = ctx.query
        let allresult = await user.find()
        let userList = await user.find().limit(Number(pageSize)).skip((page-1)*pageSize)
        ctx.body={code:0,
            userList,
            allcount:allresult.length, 
            msg:'查询ok'}
    }


/**
 * 
 * @api {post} /user/findLock 状态查找用户信息
 * @apiName 状态查找用户信息
 * @apiGroup user
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} [pageSize] 每页显示个数   默认5个
 * @apiParam  {Number} [page] 当前页数  默认第一页
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {Array} userList  用户信息数据
 * @apiSuccess   {String} msg  描述信息
 * 
 * @apiParamExample  {type} 例子:
 * {
 *    pageSize : 1,
 *    page :  1,
 *    status :  0
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
  "code": 0,
  "userList": [
    {
      "_id": "5e6900ec50807f48bce03b58",
      "phone": "13777186512",
      "nickName": "6512",
      "password": "ASDasd55",
      "sex": 1,
      "avatarImg": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582618297039&di=c60f084304646b50740e3328ee4511b0&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F67%2F59%2F63%2F58e89bee922a2.png",
      "token": "123213123123",
      "status": 0,
      "address": [],
      "__v": 0
    }
  ],
  "msg": "查询ok"
 * }
 */
    async findLock(ctx){
        let {page = 1 ,pageSize = 5,status} = ctx.query
        let userList = await user.find({status}).limit(Number(pageSize)).skip((page-1)*pageSize)
        ctx.body={code:0,
            userList,
            msg:'查询ok'}
    }



/**
 * 
 * @api {get} /user/unlock 用户账号锁定
 * @apiName 账号锁定
 * @apiGroup user
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} _id    用户的_id
 * @apiParam  {Number} status   用户要修改的状态值
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {String} msg  描述信息
 * 
 * @apiParamExample  {type} 例子:
 * {
     _id : 5e65eeb67507944adc42a519,
     status :  1,
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
    "code": 0,
    "msg": "用户账号已解锁"
 * }
 */
    async unlock(ctx){
        let {_id,status}= ctx.request.body  
        let result = await user.findByIdAndUpdate({_id},{status})
        console.log(result)
        if(!result){ ctx.throw(404,'解锁失败')}
        ctx.body={code:0,msg:'用户账号已解锁'}
    }  
  }
  module.exports =new UserCtr()
  