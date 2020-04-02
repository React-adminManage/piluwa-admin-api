const router = require('koa-router')()
router.prefix('/admin')
const authToken = require("../Middleware/autoToken")
const authPermission = require("../Middleware/autoPermissions.js")
const{find,add,del,update,dupName,login,changeStatus} = require('../Controllers/adminCtr')  

router.get('/',authToken,authPermission,find)
router.post('/add',authToken,authPermission,add)
router.post('/del',authToken,authPermission,del)
router.post('/update',authToken,authPermission,update)
router.post('/dupName',authToken,authPermission,dupName)
router.post('/changeStatus',authToken,authPermission,changeStatus)
router.post('/login',login)



module.exports = router
