const { users } = require("../config/mongoCollections")
const connection = require("../config/mongoConnection")
const ObjectID = require("mongodb").ObjectID
const bcrypt = require("bcrypt")
const saltRounds = 10

const closeDB = async () => {
  const db = await connection()
  await db.serverConfig.close()
}

const validation = (username, password) => {
    if(!username || !password) {
        throw new Error('Both username and password must be supplied.')
    }

    const alphaNumericRegex = /^[a-z0-9]+$/i
    const noWhiteSpacesRegex = /^\S*$/

    if(!alphaNumericRegex.test(username)) {
        throw new Error('Username must consist of no spaces and only alphanumeric characters.')
    }

    if(!noWhiteSpacesRegex.test(password)) {
        throw new Error('Password must not contain any white spaces.')
    }

    if(username.length < 4) {
        throw new Error('Username must be at least 4 characters long.')
    }

    if(password.length < 6) {
        throw new Error('password must be at least 6 characters long.')
    }
}

const createUser = async (username, password) => {
    validation(username, password)

    bcrypt.hash(password, saltRounds, (err, hash) => {
        // store hashed password in mongo
    })

    const lowerCasedUsername = username.toLowerCase()

}

const checkUser = async (username, password) => {
    validation(username, password)

    const lowerCasedUsername = username.toLowerCase()

    // get hashed password from mongo

    bcrypt.compare(password, hash, function(err, result) {
        
    })


    return { authenticated: true }
}


// const restaurantsCollection = await restaurants()
//     const insertInfo = await restaurantsCollection.insertOne(newRestaurant)

//     if(insertInfo.insertedCount === 0) {
//       throw new Error('Unable to add new restaurant.')
//     }

//     const id = insertInfo.insertedId
//     const _restaurant = await get(id)
