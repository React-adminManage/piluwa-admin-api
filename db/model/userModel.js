// 这边是用户的Model
const mongoose = require("mongoose")

let userScheme = mongoose.Schema({
     // __v :    {type:Number,select:false},
     // userName:{type:String,required:true},
     // passWord:{type:String,required:true,select:false}
    phone: String,   //手机号
    nickName: String,  //名字
    avatarImg: String,  //头像url
    password: String,  //密码
    sex: Number,    //性别
    token: String,  //token
    status:Number,   //用户账号状态 0表示锁定  1表示正常
    address: [{  //地址
        getName: String,
        getPhone: String,
        address: String,
        status: String
    }]
})

let userModel = mongoose.model("users",userScheme)
module.exports = userModel

