const user = require("../db/model/userModel")

class UserCtr{
    // 查找所有用户的信息
    async find(ctx){
        let {page = 1 ,pageSize = 5} = ctx.query
        let allresult = await user.find()
        let userList = await user.find().limit(Number(pageSize)).skip((page-1)*pageSize)
        ctx.body={code:0,
            userList,
            allcount:allresult.length, 
            msg:'查询ok'}
    }

    // 查询用户的信息 根据用户状态
    async findLock(ctx){
        let {page = 1 ,pageSize = 5,status} = ctx.query
        let userList = await user.find({status}).limit(Number(pageSize)).skip((page-1)*pageSize)
        ctx.body={code:0,
            userList,
            msg:'查询ok'}
    }


    // 用户账号信息修改(账号解锁)
    async unlock(ctx){
        let {_id,status}= ctx.request.body  
        let result = await user.findByIdAndUpdate({_id},{status})
        console.log(result)
        // if(!result){ ctx.throw(404,'管理员修改失败')}
        ctx.body={code:0,msg:'用户账号已解锁'}
    }  
  }
  module.exports =new UserCtr()
  