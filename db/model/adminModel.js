// 管理员 Model
const mongoose = require("mongoose")

let adminScheme = mongoose.Schema({
     __v :    {type:Number,select:false},
     userName:String,  //管理员的账号
     passWord:String,  //管理员的密码
     Status:Number,    //管理员的状态  是否被禁用  0禁用 1正常
     identity:Number,   //管理员权限 0为普通管理员 1为超级管理员
})

let adminModel = mongoose.model("admins",adminScheme)
module.exports = adminModel

