const { listShareholders, topShareholder, listStocks, getStockById } = require('./stocks')
const { getPersonById, sameStreet, manipulateSsn, sameBirthday } = require('./people')

const displayDivider = () => {
  console.log('------------------------------------------')
  console.log('------------------------------------------')
}

const main = async () => {

  try {
    // logs first 5 indicies
    const shareHolders = await listShareholders()
    console.log(shareHolders[0])
    console.log(shareHolders[1])
    console.log(shareHolders[2])
    console.log(shareHolders[3])
    console.log(shareHolders[4])
  } catch(e) {
    console.log(e)
  }

  displayDivider()

  try {
    const topShareHolder = await topShareholder(`GigaMedia Limited`)
    console.log(topShareHolder)
  } catch(e) {
    console.log(e)
  }

  displayDivider()

  // list stocks

  try {
    const stock = await getStockById('3e2051e0-f95e-4051-ae6c-267cdc25ffba')
    console.log(stock)
  } catch(e) {
    console.log(e)
  }

  displayDivider()

  try {
    const obj = await manipulateSsn()
    console.log(obj)
  } catch(e) {
    console.log(e)
  }

  displayDivider()

  try {
    const stocks = await listStocks('Kristy', 'Goady')
    console.log(stocks)
  } catch(e) {
    console.log(e)
  }

  displayDivider()

  try {
    const person = await getPersonById('55a14fb6-0c78-4004-a6c1-b185334964bc')
    console.log(person)
  } catch(e) {
    console.log(e)
  }

  displayDivider()

  try {
    const arr = await sameBirthday(09, 25)
    console.log(arr)
  } catch(e) {
    console.log(e)
  }
  
  displayDivider()


}

main()