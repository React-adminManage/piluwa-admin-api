const log = require("../db/model/logModel")

class logCtr{
    async add(obj){
        console.log(obj)
        let result = await log.insertMany(obj)
    }

    async getLog(ctx){
        
        let {page = 1 ,pageSize = 5} = ctx.request.body
        console.log(page,pageSize)
        let allresult = await log.find()
        let logList = await log.find().limit(Number(pageSize)).skip((page-1)*pageSize)
        ctx.body={code:0,
            logList,
            allcount:allresult.length,
            msg:'查询ok'
          }
    }
}


module.exports =new logCtr()