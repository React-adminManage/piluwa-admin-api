const admin = require("../db/model/adminModel")
const jsonWebToken = require("jsonwebtoken")
const {secret} = require('../config/secret')
class AdminCtr{

  /**
   * 
   * @api {get} /admin/find 查找所有管理员信息
   * @apiName 管理员信息
   * @apiGroup admin
   * @apiVersion  1.0.0
   * 
   * 
   * @apiParam  {Number} [pageSize] 每页显示个数   默认5个
   * @apiParam  {Number} [page] 当前页数  默认第一页
   * 
   * @apiSuccess   {Number} code  状态码
   * @apiSuccess   {Array} adminList  管理员信息数据
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
   *  "code": 0,
      "adminList": [
      {
        "_id": "5e7c90a086be5f0b0c5cfb3a",
        "userName": "admin",
        "passWord": "admin",
        "Status": 1,
        "identity": 1
      },
      "msg": "查询ok"
  * }
  * 
  * 
  */
  async find(ctx){
   let adminList = await admin.find()
   ctx.body={code:0,adminList,msg:'查询ok'}
  }
 


 /**
 * 
 * @api {post} /admin/add 管理员添加
 * @apiName 管理员添加
 * @apiGroup admin
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} userName  登录名
 * @apiParam  {String} passWord   密码
 * @apiParam  {Number} Status    状态 是否被禁用 0表示禁用  1 正常
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {String} msg  描述信息
 * @apiParamExample  {type} 例子:
 * {
 *    userName :  'admin111',
 *    passWord :  '111111',
 *    Status   :   0
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
    "code": 0,
    "msg": "管理员添加成功"
 * }
 */

  async add(ctx){
    let {userName,passWord,Status} =ctx.request.body
    let result = await admin.insertMany({userName,passWord,Status,identity:0})
    if(!result){ ctx.throw(-1,'管理员添加失败')}
    ctx.body ={code:0,msg:'管理员添加成功'}
  }

 /**
 * 
 * @api {post} /admin/del 管理员删除
 * @apiName 管理员删除
 * @apiGroup admin
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} _id  管理员的_id
 * 
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {String} msg  描述信息
 * 
 * @apiParamExample  {type} 例子:
 * {
 *    _id:5e7deab9438c294ec46cc465
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
    "code": 0,
    "msg": "管理员删除成功"
 * }
 */


  async del(ctx){
    let id= ctx.request.body._id
    let result =await  admin.findByIdAndDelete(id)
    if(!result){ ctx.throw(404,'管理员删除失败')}
    ctx.body={code:0,msg:'管理员删除成功'}
  }

  
 /**
 * 
 * @api {post} /admin/update 管理员信息修改
 * @apiName 管理员信息修改
 * @apiGroup admin
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} _id  管理员的_id
 * @apiParam  {String} userName  更改后的user
 * @apiParam  {String} passWord  更改后的pass
 * @apiParam  {Number} Status  更改后的状态
 * 
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {String} msg  描述信息
 * 
 * @apiParamExample  {type} 例子:
 * {
       _id:5e7c90a986be5f0b0c5cfb3b,
       userName:admin22,
       passWord:admin22,
       Status:1,
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
    "code": 0,
    "msg": "管理员修改成功"
 * }
 */
  async update(ctx){
    let _id= ctx.request.body._id  
    let {userName,passWord,Status} = ctx.request.body 
    console.log(_id)
    let result = await admin.findByIdAndUpdate({_id},{userName,passWord,Status})
    if(!result){ ctx.throw(404,'管理员修改失败')}
    ctx.body={code:0,msg:'管理员修改成功'}
  }



 /**
 * 
 * @api {post} /admin/dupName 管理员重名判断
 * @apiName 管理员重名判断
 * @apiGroup admin
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} userName  管理员的user
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {String} msg  描述信息
 * 
 * @apiParamExample  {type} 例子:
 * {
       userName:admin,
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
    "code": 404,
    "msg": "该用户名已存在",
    "stack": "NotFoundError: 该用户名已存在\n    at Object.throw (E:\\back-stage-management\\BE\\adminApi\\node_modules\\koa\\lib\\context.js:97:11)\n    at dupName (E:\\back-stage-management\\BE\\adminApi\\Controllers\\adminCtr.js:155:36)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
 * }
 */
  async dupName(ctx){
    let {userName} = ctx.request.body  
    let result =await admin.find({userName})
    console.log(result)
    if(result.length!=0){ ctx.throw(404,'该用户名已存在')}
    ctx.body={code:0,msg:'用户名可用'}
  }





  /**
 * 
 * @api {post} /admin/login 管理员登录
 * @apiName 管理员登录
 * @apiGroup admin
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} userName  管理员的user
 * @apiParam  {String} passWord  管理员的pass
 * @apiParamExample  {type} 例子:
 * {
       userName:admin,
       passWord:admin,
 * }
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {String} token  用户的token值
 * @apiSuccess   {String} msg  描述信息
 * @apiSuccessExample {type} Success-Response:
 * {
    "code": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7Il9pZCI6IjVlN2M5MGEwODZiZTVmMGIwYzVjZmIzYSIsInVzZXJOYW1lIjoiYWRtaW4iLCJwYXNzV29yZCI6ImFkbWluIiwiU3RhdHVzIjoxLCJpZGVudGl0eSI6MX1dLCJpYXQiOjE1ODUzMTI2ODIsImV4cCI6MTU4NTM5OTA4Mn0.GaXuEYrACgptQ4y3qbSchueqv39oXrYqncLSQ66Wljg",
    "msg": "登录成功"
 * }
 */
  async login(ctx){
    let {userName,passWord} = ctx.request.body    //获取前端发送的账号密码
    let result =await admin.find({userName,passWord})  //数据库查询
    if(result.length==0){ctx.throw(404,'用户名或密码错误')} //没查找
    if(result[0].Status==0){ //用户的状态==0
      ctx.throw(405,'该账号被禁用') 
    }
    console.log(result)
    let token = jsonWebToken.sign({result},secret,{expiresIn:"1d"}) //生成token
    ctx.body={code:0,token,msg:'登录成功'}
  }


  async changeStatus(ctx){
    let {_id,Status}= ctx.request.body 
    let result = await admin.findByIdAndUpdate({_id},{Status})
    if(!result){ ctx.throw(404,'账号状态更新失败')}
    ctx.body={code:0,msg:'账号状态更新成功'}
  }
}
module.exports =new AdminCtr()

