const router = require('koa-router')()

router.prefix('/log')

const{getLog} = require('../Controllers/logCtr')  

router.post('/',getLog)







module.exports = router
