const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        res.render('private', {
            username: req.session.user.username
        })
    }
})
  
module.exports = router