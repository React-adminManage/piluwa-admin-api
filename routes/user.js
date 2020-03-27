const router = require('koa-router')()
router.prefix('/user')

const{find,unlock,findLock} = require('../Controllers/userCtr')  

router.get('/find',find)
router.get('/findLock',findLock)
router.post('/unlock',unlock)



module.exports = router
