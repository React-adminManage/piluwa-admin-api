const permissionList =require('../config/permissions')
const NowTime = require('../utils/NowTime')
const{add} = require('../Controllers/logCtr')  
module.exports = async function(ctx,next){
    // 根据资源和方法验证权限
    let {path,method,state} = ctx  
    console.log(path,method,state)
    let {identity,id,userName} = state.userInfo
    let SysLog = state.SysLog
    let list = permissionList[identity] //审核列表
    // 判断是否满足权限
    let boolean = false 
    list.map((item,index)=>{
        // console.log(item.resources,path,item.permissions.indexOf(method.toLowerCase()))
        if(path.indexOf(item.resources)!==-1&&item.permissions.indexOf(method.toLowerCase())!==-1){
            boolean = true
        }
        // if(path.indexOf(item.resources)!==-1){ //匹配路径
        //     SysLog.path=path; //记录操作路径
        //     SysLog.userName=userName; //记录操作人
        //     SysLog.time=NowTime();//记录时间
        //     if(item.permissions.indexOf(method.toLowerCase())!==-1){ //
        //         boolean = true
        //     }
        // }
    })
    SysLog.time=NowTime();//记录时间
    
    
    console.log(boolean)
    if(boolean){  
        SysLog.mess='访问成功';
        // console.log(SysLog)
        // 写入Syslog
        add(SysLog)
        return  await next()
    }else{
        SysLog.mess='权限不足拦截';
        // console.log(SysLog)
        // 写入Syslog
        add(SysLog)
        ctx.body={code:403,msg:'权限不足,无法访问'}
    }
    
}