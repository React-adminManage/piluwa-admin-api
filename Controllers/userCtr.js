const user = require("../db/model/userModel")

class UserCtr{
    // 查找所有用户的信息
    async find(ctx){
        let userList = await user.find()
        ctx.body={code:0,userList,msg:'查询ok'}
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
  