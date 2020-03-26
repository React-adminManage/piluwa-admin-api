const router = require('koa-router')()
router.prefix('/user')

const{find,unlock} = require('../Controllers/userCtr')  

router.get('/find',find)
router.post('/unlock',unlock)


module.exports = router
