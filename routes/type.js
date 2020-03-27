const router = require('koa-router')()
router.prefix('/type')

const {add,find,del} = require('../Controllers/typeCtr')  

router.get('/find',find)
router.post('/add',add)
router.post('/del',del)


module.exports = router
