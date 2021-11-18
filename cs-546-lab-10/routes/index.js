const path = require('path')

const constructorMethod = (app) => {
  app.get('/', (req, res) => {
    console.log(req.session.id)
    if (!req.session.user) {
      res.render('login')
    } else {
      res.redirect('/private')
    }
  })

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' })
  })
}

module.exports = constructorMethod