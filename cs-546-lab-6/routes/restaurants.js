const express = require('express');
const router = express.Router();
const { getAll, create, get, update, remove } = require("../data/restaurants")
const ObjectID = require("mongodb").ObjectID

const validatePhoneNumber = (phoneNumber) => {
  phoneNumberArr = [...phoneNumber]
  if(phoneNumberArr[3] !== '-' && phoneNumberArr[7] !== '-' ) {
    return false
  }

  return true
}

const validateWebsite = (website) => {
  if(!website.includes('http://www.') || !website.includes('.com')) {
    return false
  }

  const last4 = website.slice(website.length - 4)

  if(last4 !== '.com') {
    return false
  }

  return true
}

const validate = async (
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
      return false
  }

  if(typeof name !== 'string' || typeof location !== 'string' || typeof phoneNumber !== 'string' || 
    typeof website !== 'string' || typeof priceRange !== 'string') {
      return false
  }
  
  if(!validatePhoneNumber(phoneNumber)) {
    return false
  }
  if(!validateWebsite(website)) {
    return false
  }

  if(priceRange !== '$' && priceRange !== '$$' && priceRange !== '$$$' && priceRange !== '$$$$') {
    return false
  }

  if(typeof cuisines !== "object" || cuisines.length < 1) {
    return false
  }
  else {
    let hasOneValidString = false
    cuisines.forEach((cuisine) => {
      hasOneValidString = typeof cuisine === "string"
    })
    if(!hasOneValidString) {
      return false
    }
  }
  
  if(typeof serviceOptions !== "object") {
    return false
  }
  else {
    if(typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || 
      typeof serviceOptions.delivery !== 'boolean') {
        return false
    }
  }
}

router.get('/', async (req, res) => {
  try {
    const restaurants = await getAll();
    let shortenedRestaurants = []
    restaurants.forEach((restaurant) => {
      shortenedRestaurants.push({
        _id: restaurant._id,
        name: restaurant.name
      })
    })

    res.json(shortenedRestaurants);
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
  console.log('req')
  console.log([req])
  const data = req.body

  if(!validate(data.name , data.location , data.phoneNumber, data.website, data.priceRange, data.cuisines, data.serviceOptions)) {
    res.status(400).send();
  }

  try {
    const restaurant = await create(
      data.name,
      data.location, 
      data.phoneNumber,
      data.website,
      data.priceRange,
      data.cuisines,
      data.serviceOptions
    )
    res.json(restaurant);
    res.status(200).send()
  }
  catch (e) {
    // Something went wrong with the server!
    res.status(500).send();
  }
})

router.get('/:id', async (req, res) => {
  try {
    let restaurant = null
    try { 
      restaurant = await get(req.params.id); 
    }
    catch (e) {
      res.status(404).json({ message: 'not found!' });
    }
    res.json(restaurant);
  } catch (e) {
    res.status(500).send();
  }
})

router.put('/:id', async (req, res) => {
  const data = req.body

  if(!req.params.id || !ObjectID.isValid(req.params.id) || !validate(data.name , data.location , data.phoneNumber, data.website, data.priceRange, data.cuisines, data.serviceOptions)) {
    res.status(400).send();
  }
  // do more error checking for whole schema

  try {
    let restaurant = null
    try {
      restaurant = await update(
        data.id,
        data.name,
        data.location, 
        data.phoneNumber,
        data.website,
        data.priceRange,
        data.cuisines,
        data.serviceOptions
      )
    } catch(e) {
      res.status(404).send();
    }
    res.json(restaurant)
    res.status(200).send()
  }
  catch(e) {
    res.status(500).send();
  }
})

router.delete('/:id', async (req, res) => { 
  try {
    let restaurant = null
    try { 
      restaurant = await remove(req.params.id); 
    }
    catch (e) {
      res.status(404).json({ message: 'not found!' });
    }
    res.json({restaurantId: req.params.id, deleted: true});
  } catch (e) {
    res.status(500).send();
  }
})

module.exports = router;
