const router = require('koa-router')()
router.prefix('/type')

const {add,find,del,edit} = require('../Controllers/typeCtr')  

router.get('/find',find)
router.post('/add',add)
router.post('/del',del)
router.post('/edit',edit)


module.exports = router
