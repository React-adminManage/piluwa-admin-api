const router = require('koa-router')()
router.prefix('/type')
const authToken = require("../Middleware/autoToken")
const authPermission = require("../Middleware/autoPermissions.js")

const {add,find,del,edit} = require('../Controllers/typeCtr')  

router.get('/find',authToken,authPermission,find)
router.post('/add',authToken,authPermission,add)
router.post('/del',authToken,authPermission,del)
router.post('/edit',authToken,authPermission,edit)


module.exports = router
