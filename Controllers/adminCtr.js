const admin = require("../db/model/adminModel")
class AdminCtr{
  async find(ctx){
   let adminList = await admin.find()
   ctx.body={code:0,adminList,msg:'查询ok'}
  }
}
module.exports =new AdminCtr()

