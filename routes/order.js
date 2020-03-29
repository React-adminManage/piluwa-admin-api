const router = require('koa-router')()
router.prefix('/order')

const{find,searchStatus,audioOrder,SearchByoId,mutilquery} = require('../Controllers/orderCtr')  

router.post('/find',find)
router.get('/SearchByoId',SearchByoId)
router.post('/searchStatus',searchStatus)
router.post('/audioOrder',audioOrder)
router.post('/mutilquery',mutilquery)




module.exports = router
