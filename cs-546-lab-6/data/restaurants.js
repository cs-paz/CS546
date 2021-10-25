const { restaurants } = require("../config/mongoCollections")
const connection = require("../config/mongoConnection")
const ObjectID = require("mongodb").ObjectID

const closeDB = async () => {
  const db = await connection()
  await db.serverConfig.close()
}

const validatePhoneNumber = (phoneNumber) => {
  phoneNumberArr = [...phoneNumber]
  if(phoneNumberArr[3] !== '-' && phoneNumberArr[7] !== '-' ) {
      throw new Error('Invalid phone number.')
  }

  return
}

const validateWebsite = (website) => {
  if(!website.includes('http://www.') || !website.includes('.com')) {
    throw new Error('Invalid website')
  }

  const last4 = website.slice(website.length - 4)

  if(last4 !== '.com') {
    throw new Error('Invalid website')
  }

  return
}

const create = async (
  name,
  location, 
  phoneNumber,
  website,
  priceRange,
  cuisines,
  serviceOptions,
  ) => {
    if(!name || !location || !phoneNumber || !website || !priceRange 
      || !cuisines || !serviceOptions) {
        throw new Error('All fields need to have valid values')
    }

    if(typeof name !== 'string' || typeof location !== 'string' || typeof phoneNumber !== 'string' || 
      typeof website !== 'string' || typeof priceRange !== 'string') {
        throw new Error('Name, location, phonenumber, website, and priceRange must all be strings.')
    }
    
    validatePhoneNumber(phoneNumber)
    validateWebsite(website)

    if(priceRange !== '$' && priceRange !== '$$' && priceRange !== '$$$' && priceRange !== '$$$$') {
      throw new Error('Invalid price range.')
    }

    if(typeof cuisines !== "object" || cuisines.length < 1) {
      throw new Error('Invalid cuisine.')
    }
    else {
      let hasOneValidString = false
      cuisines.forEach((cuisine) => {
        hasOneValidString = typeof cuisine === "string"
      })
      if(!hasOneValidString) {
        throw new Error('Invalid cuisine.')
      }
    }
    
    if(typeof serviceOptions !== "object") {
      throw new Error('Invalid service options.')
    }
    else {
      if(typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || 
        typeof serviceOptions.delivery !== 'boolean') {
          throw new Error('Invalid service options.')
      }
    }

    const newRestaurant = {
      name,
      location, 
      phoneNumber,
      website,
      priceRange,
      cuisines,
      overallRating: 0,
      serviceOptions,
      reviews: []
    }
    
    const restaurantsCollection = await restaurants()
    const insertInfo = await restaurantsCollection.insertOne(newRestaurant)

    if(insertInfo.insertedCount === 0) {
      throw new Error('Unable to add new restaurant.')
    }

    const id = insertInfo.insertedId
    const _restaurant = await get(id)

    // await closeDB()

    return _restaurant
}

const getAll = async () => {
  const restaurantsCollection = await restaurants()

  const allRestaurants = await restaurantsCollection.find({}).toArray()

  // await closeDB()

  return allRestaurants
}

const get = async (id) => {
  if(!id || (typeof id !== 'string' && !ObjectID.isValid(id))) {
    throw new Error('Invalid ID.')
  }

  const restaurantsCollection = await restaurants()

  const _restaurant = await restaurantsCollection.findOne({_id: typeof id === 'string' ? new ObjectID(id) : id})
  if(!_restaurant || _restaurant === null) {
    throw new Error('Restaurant not found.')
  }

  // await closeDB()

  return _restaurant
}

const remove = async (id) => {
  if(!id || (typeof id !== 'string' && !ObjectID.isValid(id))) {
    throw new Error('Invalid ID.')
  }

  let _restaurant = null
  try {
    _restaurant = await get(id)
  } catch {
    throw new Error('restaurant not found.')
  }

  const restaurantsCollection = await restaurants()
  const deletionInfo = await restaurantsCollection.removeOne({_id: typeof id === 'string' ? new ObjectID(id) : id})

  if(deletionInfo.deletedCount === 0) {
    throw new Error(`Could not delete restaurant with id ${id}`)
  }

  // await closeDB()

  return `${_restaurant.name} has been successfully deleted!`

}

const update = async (id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) => {
  if(!id || (typeof id !== 'string' && !ObjectID.isValid(id))) {
    throw new Error('Invalid ID.')
  }

  if(!name || !location || !phoneNumber || !website || !priceRange 
    || !cuisines || !serviceOptions) {
      throw new Error('All fields need to have valid values')
  }

  if(typeof name !== 'string' || typeof location !== 'string' || typeof phoneNumber !== 'string' || 
    typeof website !== 'string' || typeof priceRange !== 'string') {
      throw new Error('Name, location, phonenumber, website, and priceRange must all be strings.')
  }
  
  validatePhoneNumber(phoneNumber)
  validateWebsite(website)

  if(priceRange !== '$' && priceRange !== '$$' && priceRange !== '$$$' && priceRange !== '$$$$') {
    throw new Error('Invalid price range.')
  }

  if(typeof cuisines !== "object" || cuisines.length < 1 || !Array.isArray(cuisines)) {
    throw new Error('Invalid cuisine.')
  }
  else {
    let hasOneValidString = false
    cuisines.forEach((cuisine) => {
      hasOneValidString = typeof cuisine === "string"
    })
    if(!hasOneValidString) {
      throw new Error('Invalid cuisine.')
    }
  }
  
  if(typeof serviceOptions !== "object") {
    throw new Error('Invalid service options.')
  }
  else {
    if(typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || 
      typeof serviceOptions.delivery !== 'boolean') {
        throw new Error('Invalid service options.')
    }
  }

  // will error if does not exist
  const _restaurant = await get(id)

  const updatedRestaurantObj = {
    ..._restaurant,
    name: name,
    location: location,
    phoneNumber: phoneNumber,
    website: website,
    priceRange: priceRange,
    cuisines: cuisines,
    serviceOptions: serviceOptions,
    overallRating: 0,
    reviews: []
  }

  const restaurantsCollection = await restaurants()
  const updateInfo = await restaurantsCollection.replaceOne({_id: typeof id === 'string' ? new ObjectID(id) : id}, updatedRestaurantObj)
 
  if(updateInfo.modifiedCount === 0) {
    throw new Error(`Could not update restaurant with id ${id}`)
  }

  const _updatedRestaurant = await get(id)

  // await closeDB()

  return _updatedRestaurant
}

const main = async () => {
  // console.log(await create('Sandcastle Diner', 'Beachwood', '555-555-5555', 'http://www.youtube.com', '$', ['burritos'], 10, {dineIn: true, takeOut: false, delivery: false}))
  // console.log(await create('Friendlys', 'Toms River', '666-666-6666', 'http://www.friendlys.com', '$$', ['ice cream'], 10, {dineIn: false, takeOut: true, delivery: false}))
  // console.log(await getAll())
  // console.log(await get('ID HERE'))
  // console.log(await remove('615cd7d20a9dfb3bdd988795'))
  // console.log(await rename('615cdab552ce7a3c851e2377', 'http://www.nintendo.com'))

  // const db = await connection()
  // await db.serverConfig.close()

  // return 0
}

module.exports = {
  create,
  get,
  getAll,
  remove,
  update,
}
