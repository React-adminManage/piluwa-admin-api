const path = require('path')



/**
 * 
 * @api {post} /upload 图片上传
 * @apiName 图片上传
 * @apiGroup upload
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {formdata}   formdata类型
 * 
 * @apiSuccess   {Number} code  状态码
 * @apiSuccess   {String} msg  描述信息
 * @apiSuccess   {String} path  图片在服务器的相对路径
 * 
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
    code: 0
    msg: "图片上传ok"
    path: "/upload/upload_49712aae10c31320c5a2db45fb832e19.jpg"
 * }
 * 
 * 
 */
class uploadCtr{
    uploadImg(ctx){
        let file =ctx.request.files.hehe
        let baseName = path.basename(file.path)
        ctx.body={code:0,msg:"图片上传ok",path:`/upload/${baseName}`}
       }
}
module.exports =new uploadCtr()
