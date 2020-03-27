const type = require("../db/model/typeModel")

class TypeCtr{

    // 新增分类
    async add(ctx){
        let {Type} = ctx.request.body;
        console.log(Type)
        let result = await type.insertMany({Type})
        if(!result){ ctx.throw(-1,'添加失败')}
        ctx.body ={code:0,msg:'添加成功'}
    }

    //所有分类
    async find(ctx){
        let typeList = await type.find()
        ctx.body={code:0,typeList,msg:'查询ok'}
    }

    // 删除指定类别 通过_id
    async del(ctx){
        let _id = ctx.request.body;
        let result =await  type.findByIdAndDelete(_id)
        if(!result){ ctx.throw(404,'删除失败')}
        ctx.body={code:0,msg:'删除类别成功'}
    }
  }
  module.exports =new TypeCtr()
  