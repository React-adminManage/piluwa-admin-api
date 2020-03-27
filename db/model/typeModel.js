// 这边是用户的Model
const mongoose = require("mongoose")

let typeScheme = mongoose.Schema({
    Type:String
})

let typeModel = mongoose.model("types",typeScheme)
module.exports = typeModel

