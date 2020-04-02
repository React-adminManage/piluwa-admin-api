const router = require('koa-router')()
const authToken = require("../Middleware/autoToken")
const authPermission = require("../Middleware/autoPermissions.js")
router.prefix('/order')

const{find,searchStatus,audioOrder,audioFind} = require('../Controllers/orderCtr')  

router.post('/find',authToken,authPermission,find)
router.get('/audioFind',authToken,authPermission,audioFind)
router.post('/searchStatus',authToken,authPermission,searchStatus)
router.post('/audioOrder',authToken,authPermission,audioOrder)






module.exports = router
