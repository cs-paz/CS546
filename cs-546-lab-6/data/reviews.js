const { restaurants } = require("../config/mongoCollections")
const connection = require("../config/mongoConnection")
const ObjectID = require("mongodb").ObjectID

const validateDateString = (date) => {
  const arr = [...date]
  if(arr[2] != '/' || arr[5] != '/' || arr.length != 10) {
    return false
  }

  return true
}


const create = async (
  restaurantId,
  title,
  reviewer,
  rating,
  dateOfReview,
  review
) => {

  if(!restaurantId || !title || !reviewer || !rating || !dateOfReview || !review ) {
      throw new Error('All fields need to have valid values')
  }

  if((typeof restaurantId !== 'string' && !ObjectID.isValid(restaurantId))|| typeof title !== 'string' || typeof reviewer !== 'string' || 
    typeof dateOfReview !== 'string' || typeof review !== 'string') {
      throw new Error('Name, location, phonenumber, website, and priceRange must all be strings.')
  }

  if(!ObjectID.isValid(restaurantId)) {
    throw new Error('Invalid id.')
  }

  if(typeof rating !== "number" || rating < 1 || rating > 5) {
    throw new Error('invalid rating')
  }

  if(!validateDateString(dateOfReview)) {
    throw new Error('invalid date')
  }

  // check for date of Review

  const restaurantsCollection = await restaurants()

  const _restaurant = await restaurantsCollection.findOne({_id: typeof restaurantId === 'string' ? new ObjectID(restaurantId) : restaurantId})
  if(!_restaurant || _restaurant === null) {
    throw new Error('Restaurant not found.')
  }

  const newReview = {
    _id: ObjectID(),
    title,
    reviewer,
    rating,
    dateOfReview,
    review
  }

  const existingReviews = _restaurant.reviews
  existingReviews.push(newReview)
  const updatedReviews = existingReviews

  let sum = 0
  updatedReviews.forEach((review) => { 
    sum += review.rating
  })

  const averageRating = sum / updatedReviews.length

  // calculate overall ratings here

  const updatedRestaurantObj = {
    ..._restaurant,
    reviews: updatedReviews,
    overallRating: averageRating
  }

  const updateInfo = await restaurantsCollection.replaceOne({_id: typeof restaurantId === 'string' ? new ObjectID(restaurantId) : restaurantId}, updatedRestaurantObj)
 
  if(updateInfo.modifiedCount === 0) {
    throw new Error(`Could not update restaurant with id ${id}`)
  }
  
  const newRestaurant = await restaurantsCollection.findOne({_id: typeof restaurantId === 'string' ? new ObjectID(restaurantId) : restaurantId})

  return newRestaurant
}

const getAll = async (restaurantId) => {
  if(!restaurantId || !ObjectID.isValid(restaurantId) || typeof restaurantId !== "string") {
    throw new Error('Invalid id.')
  }

  const restaurantsCollection = await restaurants()

  const _restaurant = await restaurantsCollection.findOne({_id: typeof restaurantId === 'string' ? new ObjectID(restaurantId) : restaurantId})
  if(!_restaurant || _restaurant === null) {
    throw new Error('Restaurant not found.')
  }

  const reviews = _restaurant.reviews

  return reviews
}

const arrayEquals = (a, b) => {
  return a.every((val, index) => val === b[index])
}

const get = async (reviewId) => {
  if(!reviewId || !ObjectID.isValid(reviewId) || typeof reviewId !== "string") {
    throw new Error('Invalid id.')
  }

  const restaurantsCollection = await restaurants()

  const allRestaurants = await restaurantsCollection.find({}).toArray()

  let _review = null

  allRestaurants.forEach((restaurant) => {
    restaurant.reviews.forEach((review) => {
      if(arrayEquals([...review._id.toString()], [...reviewId])) {
        _review = review
      }
    })
  })

  if(_review && _review !== null) {
    return _review
  }

  throw new Error('Review not found.')
}

const remove = async (reviewId) => {
  if(!reviewId || !ObjectID.isValid(reviewId) || typeof reviewId !== "string") {
    throw new Error('Invalid id.')
  }

  const restaurantsCollection = await restaurants()

  const allRestaurants = await restaurantsCollection.find({}).toArray()

  let restaurantInfo = {}
  allRestaurants.forEach((restaurant) => {
    restaurant.reviews.forEach((review) => {
      if(arrayEquals([...review._id.toString()], [...reviewId])) {
        restaurantInfo = {
          Id: restaurant._id,
          reviewId: review._id
        }
      }
    })
  })

  if(!restaurantInfo || restaurantInfo == null) {
    throw new Error('Review not found.')
  }

  const _restaurant = await restaurantsCollection.findOne({_id: typeof restaurantInfo.Id === 'string' ? new ObjectID(restaurantInfo.Id) : restaurantInfo.Id})
  if(!_restaurant || _restaurant === null) {
    throw new Error('Restaurant not found.')
  }

  const existingReviews = _restaurant.reviews
  const updatedReviews = existingReviews.filter((review) => {
    return !arrayEquals([...review._id.toString()], [...restaurantInfo.reviewId.toString()])
  })

  let sum = 0
  updatedReviews.forEach((review) => { 
    sum += review.rating
  })

  const averageRating = sum / updatedReviews.length

  const updatedRestaurantObj = {
    ..._restaurant,
    overallRating: averageRating,
    reviews: updatedReviews,
  }

  const updateInfo = await restaurantsCollection.replaceOne({_id: typeof restaurantInfo.Id === 'string' ? new ObjectID(restaurantInfo.Id) : restaurantInfo.Id}, updatedRestaurantObj)
 
  if(updateInfo.modifiedCount === 0) {
    throw new Error(`Could not update review with id ${reviewId}`)
  }
  
  const newRestaurant = await restaurantsCollection.findOne({_id: typeof restaurantInfo.Id === 'string' ? new ObjectID(restaurantInfo.Id) : restaurantInfo.Id})

  return newRestaurant
}

// const main = async () => {
//   console.log(await get('6176eb86c69b0ba774e4d103'))
// }

// main()

module.exports = {
  createReview: create,
  create,
  getAll,
  get,
  remove,
}