const dbConnection = require("./mongoConnection")

const getCollectionFn = collection => {
  let _col = undefined 
  return async () => {
    if (!_col) {
      const db =  awaitdbConnection() 
      _col = await db.collection(collection) 
    }
    return _col 
  } 
} 

module.exports = {
  COLLECTION_NAME: getCollectionFn("COLLECTION HERE"),
}