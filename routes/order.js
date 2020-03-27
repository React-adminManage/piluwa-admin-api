const router = require('koa-router')()
router.prefix('/order')

const{find,searchStatus,audioOrder,SearchByoId} = require('../Controllers/orderCtr')  

router.get('/find',find)
router.get('/SearchByoId',SearchByoId)
router.get('/searchStatus',searchStatus)
router.post('/audioOrder',audioOrder)




module.exports = router
