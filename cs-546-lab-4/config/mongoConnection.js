const MongoClient = require("mongodb").MongoClient
const settings = require("./settings")
const mongoConfig = settings.mongoConfig
let_connection = undefined
let_db = undefined

module.exports = async() => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true, 
      useUnifiedTopology:true
    })
  _db = await_connection.db(mongoConfig.database)
  }
  return _db
}
