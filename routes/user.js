const router = require('koa-router')()
router.prefix('/user')
const authToken = require("../Middleware/autoToken")
const authPermission = require("../Middleware/autoPermissions.js")

const{find,unlock,findLock} = require('../Controllers/userCtr')  

router.get('/find',authToken,authPermission,find)
router.get('/findLock',authToken,authPermission,findLock)
router.post('/unlock',authToken,authPermission,unlock)



module.exports = router
