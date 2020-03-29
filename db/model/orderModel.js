// 这边是订单的Model
const mongoose = require("mongoose")

let orderScheme = mongoose.Schema({
    "oId": String,    //订单ID
    "oUser":String,   //user
    "oShopMsg": Array,   // 订单内容信息
    "oAddress": Object,  //订单收货地址
    'oStatus':String,  //订单状态
    // 0 未付款  1 已付款  2 已完成  3 取消  4审核中
    'createTime':String,  //创建时间
    'updateTime':String,  //更新时间
    'allprice':Number,    //总价
    'auditMsg':String,   //审核信息
    'auditRes':String,  //审核结果
})

let orderModel = mongoose.model("orders",orderScheme)
module.exports = orderModel

