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
  if(!validate(req.params.name , req.params.location , req.params.phoneNumber, req.params.website, req.params.priceRange, req.params.cuisines, req.params.serviceOptions)) {
    res.status(400).send();
  }

  try {
    const restaurant = await create(
      req.params.name,
      req.params.location, 
      req.params.phoneNumber,
      req.params.website,
      req.params.priceRange,
      req.params.cuisines,
      req.params.serviceOptions
    )
    res.json(restaurant);
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
  if(!req.params.id || !ObjectID.isValid(req.params.id) || !validate(req.params.name , req.params.location , req.params.phoneNumber, req.params.website, req.params.priceRange, req.params.cuisines, req.params.serviceOptions)) {
    res.status(400).send();
  }
  // do more error checking for whole schema

  try {
    let restaurant = null
    try {
      restaurant = await update(
        req.params.id,
        req.params.name,
        req.params.location, 
        req.params.phoneNumber,
        req.params.website,
        req.params.priceRange,
        req.params.cuisines,
        req.params.serviceOptions
      )
    } catch(e) {
      res.status(404).send();
    }
    res.json(restaurant)
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
