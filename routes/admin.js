const router = require('koa-router')()
router.prefix('/admin')

const{find,add,del,update,dupName,login} = require('../Controllers/adminCtr')  

router.get('/',find)
router.post('/add',add)
router.post('/del',del)
router.post('/update',update)
router.post('/dupName',dupName)
router.post('/login',login)



module.exports = router
