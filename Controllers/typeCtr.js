const type = require("../db/model/typeModel")

class TypeCtr{


/**
 * 
 * @api {post} /type/add 分类添加
 * @apiName 分类添加
 * @apiGroup type
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} Type  添加的分类名
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {String} msg  描述信息
 * 
 * @apiParamExample  {type} 例子:
 * {
 *    Type : 孕产母乳
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
    "code": 0,
    "msg": "添加成功"
 * }
 * 
 * 
 */
    async add(ctx){
        let {Type} = ctx.request.body;
        console.log(Type)
        let result = await type.insertMany({Type})
        if(!result){ ctx.throw(-1,'添加失败')}
        ctx.body ={code:0,msg:'添加成功'}
    }

/**
 * 
 * @api {get} /type/find 所有分类
 * @apiName 所有分类
 * @apiGroup type
 * @apiVersion  1.0.0
 * 
 * 
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {Array} typeList   查找到的分类列表
 * @apiSuccess   {String} msg  描述信息
 * 
 * @apiParamExample  {type} 例子:
 * {

 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
  "code": 0,
  "typeList": [
    {
      "_id": "5e7db949d0783c3b9ca99fb3",
      "Type": "全球奶粉",
      "__v": 0
    },
    {
      "_id": "5e7db958d0783c3b9ca99fb4",
      "Type": "皮噜娃尿包",
      "__v": 0
    },
    {
      "_id": "5e7db95ed0783c3b9ca99fb5",
      "Type": "尿不湿",
      "__v": 0
    },
    {
      "_id": "5e7db963d0783c3b9ca99fb6",
      "Type": "营养辅食",
      "__v": 0
    },
    {
      "_id": "5e7db969d0783c3b9ca99fb7",
      "Type": "喂养用品",
      "__v": 0
    },
    {
      "_id": "5e7db96ed0783c3b9ca99fb8",
      "Type": "宝宝洗护",
      "__v": 0
    },
    {
      "_id": "5e7db973d0783c3b9ca99fb9",
      "Type": "清洁用品",
      "__v": 0
    }
  ],
  "msg": "查询ok"
 * }
 * 
 * 
 */
    async find(ctx){
        let typeList = await type.find()
        ctx.body={code:0,typeList,msg:'查询ok'}
    }



/**
 * 
 * @api {post} /type/del 分类删除
 * @apiName 分类删除
 * @apiGroup type
 * @apiVersion  1.0.0
 * 
 * 
 * 
 * @apiParam  {String} _id   类别的_id
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {String} msg  描述信息
 * 
 * @apiParamExample  {type} 例子:
 * {
    _id:5e7df7e0fec2842850bb7163
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
   "code": 0,
   "msg": "删除类别成功"
 * }
 * 
 * 
 */
    async del(ctx){
        let _id = ctx.request.body;
        let result =await  type.findByIdAndDelete(_id)
        if(!result){ ctx.throw(404,'删除失败')}
        ctx.body={code:0,msg:'删除类别成功'}
    }



  /**
 * 
 * @api {post} /type/edit 修改分类
 * @apiName 修改分类
 * @apiGroup type
 * @apiVersion  1.0.0
 * 
 * 
 * 
 * @apiParam  {String} _id   类别的_id
 * @apiParam  {String} Type  要修改成的分类值
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {String} msg  描述信息
 * 
 * @apiParamExample  {type} 例子:
 * {
    _id:5e7df7e0fec2842850bb7163,
    Type:'修改'
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
   "code": 0,
   "msg": "修改类别成功"
 * }
 * 
 * 
 */
async edit(ctx){
  let {_id,Type} = ctx.request.body;
  let result =await type.findByIdAndUpdate(_id,{Type})
  if(!result){ ctx.throw(404,'修改失败')}
  ctx.body={code:0,msg:'修改类别名成功'}
}

  }
  module.exports =new TypeCtr()
  