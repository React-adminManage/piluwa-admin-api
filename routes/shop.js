const router = require('koa-router')()
router.prefix('/shop')
const authToken = require("../Middleware/autoToken")
const authPermission = require("../Middleware/autoPermissions.js")

const{find,add,dupName,del,changeState,getById,edit} = require('../Controllers/shopCtr')  

router.get('/find',authToken,authPermission,find)
router.post('/add',authToken,authPermission,add)
router.post('/dupName',authToken,authPermission,dupName)
router.post('/del',authToken,authPermission,del)
router.post('/changeState',authToken,authPermission,changeState)
router.post('/getById',authToken,authPermission,getById)
router.post('/edit',authToken,authPermission,edit)




module.exports = router
