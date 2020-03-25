const router = require('koa-router')()
router.prefix('/admin')

const{find} = require('../Controllers/adminCtr')  

router.get('/',find)
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
