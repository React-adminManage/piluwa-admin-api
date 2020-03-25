const mongoose = require("mongoose")

let adminScheme = mongoose.Schema({
     __v :    {type:Number,select:false},
     userName:{type:String,required:true},
     passWord:{type:String,required:true,select:false}

})

let adminModel = mongoose.model("admins",adminScheme)
module.exports = adminModel

