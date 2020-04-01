const router = require('koa-router')()
router.prefix('/order')

const{find,searchStatus,audioOrder,audioFind} = require('../Controllers/orderCtr')  

router.post('/find',find)
router.get('/audioFind',audioFind)
router.post('/searchStatus',searchStatus)
router.post('/audioOrder',audioOrder)






module.exports = router
