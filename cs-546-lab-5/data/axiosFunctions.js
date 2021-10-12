const axios = require('axios')

const stringErrorChecking = (string) => {
  if(!string || string === null || typeof string !== "string") {
    throw new Error('id parameter must defined, non null, and of type string.')
  }

  if(string.includes(' ')) {
    throw new Error('id parameter must not contain spaces.')
  }
}

const getPeople = async () => {
  const { data } = await axios.get(`https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json`)
  return data
}

const getStocks = async () => {
  const { data } = await axios.get(`https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json`)
  return data
}

const getPersonById = async (id) => {
  stringErrorChecking(id)

  const people = await getPeople()
  let personData = null

  const loop = people.forEach((person) => {
    if(person.id === id) {
      personData = person
    }
  })

  if(!personData || personData === null || typeof personData !== "object") {
    throw new Error('person not found')
  }
  
  return personData
}

const getStockById = async (id) => {
  stringErrorChecking(id)

  const stocks = await getStocks()
  let stockData = null

  const loop = stocks.forEach((stock) => {
    if(stock.id === id) {
      stockData = stock
    }
  })

  if(!stockData || stockData === null || typeof stockData !== "object") {
    throw new Error('stock not found')
  }
  
  return stockData
}

module.exports = {
  getPeople,
  getStocks,
  getPersonById,
  getStockById
}