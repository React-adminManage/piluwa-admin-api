const mongoose = require("mongoose")

let logScheme = mongoose.Schema({
    target:'String',  //目标地址
    adminName:'String',//操作管理员账号
    time:'String',//时间
    mess:'String',//返回结果信息
})

let logModel = mongoose.model("logs",logScheme)
module.exports = logModel
