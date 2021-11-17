const express = require("express")
const app = express()
const configRoutes = require('./routes')
const session = require('express-session')
const exphbs = require('express-handlebars')
const port = 3000

app.use(express.json())

app.use(
  session({
    name: 'AwesomeWebApp',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000 }
  })
);

app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

configRoutes(app)

app.listen(port, () => {
  console.log("We've now got a server!")
  console.log(`Your routes will be running on http://localhost:${port}`)
})