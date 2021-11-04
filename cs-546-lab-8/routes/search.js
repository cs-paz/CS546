const express = require('express')
const router = express.Router()
const axios = require('axios')
const md5 = require('blueimp-md5')
const publickey = 'a51f48ecb35f6deb26662f85b9e6f67e'
const privatekey = 'def1ecc0b11e8940f81718b6c49de4a47f6dcabd'
const ts = new Date().getTime()
const stringToHash = ts + privatekey + publickey
const hash = md5(stringToHash)
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters'

router.post('/', async (req, res) => {
  const { searchTerm } = req.body
  const url = baseUrl + '?nameStartsWith=' + searchTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash

  const response = await axios.get(`${url}`)
  const { data: { results }} = response
  console.log(results)
  res.render('search/search', {
    results: results
  })
})

module.exports = router
