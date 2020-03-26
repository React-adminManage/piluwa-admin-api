const router = require('koa-router')()
router.prefix('/shop')

const{find,add,dupName,del,changeState} = require('../Controllers/shopCtr')  
router.get('/find',find)
router.post('/add',add)
router.post('/dupName',dupName)
router.post('/del',del)
router.post('/changeState',changeState)



module.exports = router
