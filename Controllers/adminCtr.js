const admin = require("../db/model/adminModel")
const jsonWebToken = require("jsonwebtoken")
const {secret} = require('../config/secret')
class AdminCtr{
  // 查找所有管理员信息
  async find(ctx){
   let adminList = await admin.find()
   ctx.body={code:0,adminList,msg:'查询ok'}
  }
  // 添加管理员
  async add(ctx){
    let {userName,passWord,Status,identity} =ctx.request.body
    console.log(userName,passWord,Status,identity)
    let result = await admin.insertMany({userName,passWord,Status,identity})
    if(!result){ ctx.throw(-1,'管理员添加失败')}
    ctx.body ={code:0,msg:'管理员添加成功'}
  }
  // 删除管理员  根据_id
  async del(ctx){
    let id= ctx.request.body._id
    let result =await  admin.findByIdAndDelete(id)
    if(!result){ ctx.throw(404,'管理员删除失败')}
    ctx.body={code:0,msg:'管理员删除成功'}
  }
  // 管理员修改
  async update(ctx){
    let _id= ctx.request.body._id  
    let {userName,passWord,Status} = ctx.request.body 
    console.log(_id)
    let result = await admin.findByIdAndUpdate({_id},{userName,passWord,Status})
    if(!result){ ctx.throw(404,'管理员修改失败')}
    ctx.body={code:0,msg:'管理员修改成功'}
  }

  // 管理员的添加重名判断
  async dupName(ctx){
    let {userName} = ctx.request.body  
    let result =await admin.find({userName})
    console.log(result)
    if(result.length!=0){ ctx.throw(404,'该用户名已存在')}
    ctx.body={code:0,msg:'用户名可用'}
  }

  // 管理员的登录判断
  async login(ctx){
    let {userName,passWord} = ctx.request.body  
    let result =await admin.find({userName,passWord})
    if(result.length==0){ctx.throw(404,'用户名或密码错误')}
    if(result[0].Status==0){
      ctx.throw(405,'该账号被禁用')
    }
    console.log(result)
    let token = jsonWebToken.sign({result},secret,{expiresIn:"1d"}) //生成token
    ctx.body={code:0,token,msg:'登录成功'}
  }
}
module.exports =new AdminCtr()

