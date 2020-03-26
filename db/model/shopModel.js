// 这边是商品的Model
const mongoose = require("mongoose")

let shopScheme = mongoose.Schema({
    "productId": String,  //商品ID
    "imgUrl": String,     //图片地址
    "title": String,      //名字
    "productName": String,   //标题
    "originalPrice": Number,  //标准价
    "currentPrice": Number,  //会员价
    "describe": String,   //描述
    "standards": [{  
        "title": String,  //规格
        "standards": Array,  //规格详情
    }],
    "count": Number,   //库存
    "imgArr": Array,   //详情页的图片
    "type": String,    //类型
    "Status":Number,  //状态 0 下架 1 上架
})

let shopModel = mongoose.model("shops",shopScheme)
module.exports = shopModel

