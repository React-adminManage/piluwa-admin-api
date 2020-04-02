const jsonwebtoken = require('jsonwebtoken')
const {secret} = require('../config/secret') //配置私钥
const NowTime = require('../utils/NowTime')
const {add} = require('../Controllers/logCtr')  
module.exports=function(ctx,next){
    console.log(ctx.request.header.authorization)  
    let token = ctx.request.header.authorization.split('Bearer ')[1]//获取传来的token
    let {path,method} = ctx  
    let SysLog={ //创建日志对象
        target:method+':'+path
    };

    try { //token有效
        console.log(jsonwebtoken.verify(token,secret).result[0])
        const userInfo = jsonwebtoken.verify(token,secret).result[0];//解token 拿到管理员账号名
        ctx.state.userInfo = userInfo  //将用户信息存入
        SysLog.adminName = userInfo.userName //写入操作者
        ctx.state.SysLog=SysLog
    }catch(error){
        SysLog.time=NowTime() //记录时间
        SysLog.mess='无效Token';
        // ajax写入日志
        add(SysLog)
        return ctx.throw(402,"token失效")
    }
    return next()
}