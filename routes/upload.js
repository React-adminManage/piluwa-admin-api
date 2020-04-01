const router = require('koa-router')()
router.prefix('/upload')


const{uploadImg} = require('../Controllers/uploadCtr')  

router.post('/',uploadImg)
module.exports = router
