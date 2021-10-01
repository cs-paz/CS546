const axios = require('axios')

const { getPersonById, sameStreet, manipulateSsn, sameBirthday } = require('./people.js')

const getStocks = async () => {
  const { data } = await axios.get(`https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json`)
  return data
}

const getPeople = async () => {
  const { data } = await axios.get(`https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json`)
  return data
}

const stringErrorChecking = (string) => {
  if(!string || string === null || typeof string !== "string") {
    throw new Error('id parameter must defined, non null, and of type string.')
  }

  if(string.includes(' ')) {
    throw new Error('id parameter must not contain spaces.')
  }
}

const getPersonByIdModified = async (id, people) => {
  stringErrorChecking(id)

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

const listShareholders = async () => {
  const stocks = await getStocks()
  const people = await getPeople()

  const newStocks = []
  let shareHolders = []

  for(var stock of stocks) {
    for(var shareholder of stock.shareholders) {
      const person = await getPersonByIdModified(shareholder.userId, people)
      shareHolders.push({
        first_name: person.first_name,
        last_name: person.last_name,
        number_of_shares: shareholder.number_of_shares
      })
    }
    newStocks.push({
      id: stock.id,
      stock_name: stock.stock_name,
      shareholders: shareHolders
    })
    shareHolders = []
  }

  return newStocks
}

const topShareholder = async (stockName) => {
  if(!stockName || stockName === null || typeof stockName !== "string") {
    throw new Error('stockName parameter must defined, non null, and of type string.')
  }

  const stocksWithShareHolders = await listShareholders()

  const stock = stocksWithShareHolders.find(elem => elem.stock_name === stockName) 

  let topShareHolderObj = stock.shareholders[0]
  stock.shareholders.forEach((shareholder) => {
    if(shareholder.number_of_shares > topShareHolderObj.number_of_shares) {
      topShareHolderObj = shareholder
    }
  })

  let str = ""
  if(stock) {
    str = `With ${topShareHolderObj.number_of_shares} shares in ${stockName}, ${topShareHolderObj.first_name} ${topShareHolderObj.last_name} is the top shareholder.`
  }
  else {
    str = `${stockName} currently has no shareholders.`
  }

  return str
}

const listStocks = async (firstName, lastName) => {
  stringErrorChecking(firstName)
  stringErrorChecking(lastName)

  const people = await getPeople()
  const stocksWithShareholderNames = await listShareholders()

  let arrayOfStocks = []

  stocksWithShareholderNames.forEach((stock) => {
    stock.shareholders.forEach((shareholder) => {
      if(shareholder.first_name === firstName && shareholder.last_name === lastName) {
        arrayOfStocks.push({
          stock_name: stock.stock_name,
          number_of_shares: shareholder.number_of_shares
        })
      }
    })
  })

  if(arrayOfStocks.length < 1) {
    throw new Error('This person does not exist or owns 0 stocks')
  }

  return arrayOfStocks

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

const main = async () => {
  // console.log(await listShareholders())

  // console.log(await topShareholder('Aeglea BioTherapeutics, Inc.')) 
  // Returns: "With 449 shares in Aeglea BioTherapeutics, Inc., Caresse Clissett is the top shareholder."

  //console.log(await topShareholder('Nuveen Floating Rate Income Fund')) 
  // Returns: "With 372 shares in Nuveen Floating Rate Income Fund, Thorstein Sarjeant is the top shareholder."

  // console.log(await topShareholder('Powell Industries, Inc.')) 
  // Returns: "Powell Industries, Inc. currently has no shareholders."

  // console.log(await listStocks("Grenville", "Pawelke" )) 
  /* Returns:
  [
    {stock_name: "PAREXEL International Corporation", number_of_shares: 443},
    {stock_name: "Vanguard Russell 2000 ETF", number_of_shares: 59},
    {stock_name: "National CineMedia, Inc.", number_of_shares: 320},
    {stock_name: "CombiMatrix Corporation", number_of_shares: 434}

  ]*/
  // console.log(await listStocks('Patrick', "Hill")) // Throws Error because Patrick Hill is not in people.json
  // console.log(await listStocks()) // Throws Error
  // console.log(await listStocks("foo")) // Throws Error 
  // console.log(await listStocks("      ", "        ")) // Throws Error
  // console.log(await listStocks(1,2)) // Throws Error

  // console.log(await getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0")) 
  // Returns: 
  /*{
    id: 'f652f797-7ca0-4382-befb-2ab8be914ff0',

    stock_name: 'Transcat, Inc.',

    shareholders: [

      {userId: '55ce26c4-915c-4a99-afe9-544e57227fcd',number_of_shares: 155},

      {userId: 'b9245e24-0ac7-49fc-a487-af4b7142a7e4',number_of_shares: 307},

      {userId: 'ed0ec3bf-3ec4-4025-8b26-ebd17487cb22',number_of_shares: 44},

      {userId: '56b285ff-ff97-417b-a9c7-d423b13c25a6',number_of_shares: 396},

      {userId: 'bf8b066a-3f06-4987-9e61-0388f6374a4d',number_of_shares: 335},

      {userId: '9369a0eb-9d4c-434a-901b-b29a92da91ed',number_of_shares: 399},

      {userId: '74fd73cb-1ca9-443d-9c8a-b263fe4e0ce3',number_of_shares: 139}

    ]

  }*/
  // console.log(await getStockById(-1)) // Throws Error 
  // console.log(await getStockById(1001)) // Throws Error 
  // console.log(await getStockById()) // Throws Error
  // console.log(await getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff')) // Throws stock not found Error

  // console.log(await getStocks())

}

main()

module.exports = {
  listShareholders,
  topShareholder,
  listStocks,
  getStockById
}