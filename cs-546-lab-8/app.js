const express = require("express")
const app = express()
const static = express.static(__dirname + '/public')
const configRoutes = require('./routes')
const port = 3000
const exphbs = require('express-handlebars')

app.use('/public', static)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

configRoutes(app)

app.listen(port, () => {
  console.log("We've now got a server!")
  console.log(`Your routes will be running on http://localhost:${port}`)
})