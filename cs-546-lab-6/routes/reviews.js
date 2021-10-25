const express = require('express');
const router = express.Router();
const { create, getAll, get, remove } = require('../data/reviews')
const ObjectID = require("mongodb").ObjectID


const validate = async (
  restaurantId,
  title,
  reviewer,
  rating,
  dateOfReview,
  review
) => {

  if(!restaurantId || !title || !reviewer || !rating || !dateOfReview || !review ) {
      return false
  }

  if(typeof restaurantId !== 'string' || typeof title !== 'string' || typeof reviewer !== 'string' || 
    typeof dateOfReview !== 'string' || typeof review !== 'string') {
      return false
  }

  if(!ObjectID.isValid(restaurantId)) {
    return false
  }

  if(typeof rating !== "number" || rating < 1 || rating > 5) {
    return false
  }

  return true
}

router.get('/:id', async (req, res) => {
  try {
    let restaurant = null
    try { 
      restaurant = await getAll(req.params.restaurantId); 
    }
    catch (e) {
      res.status(404).json({ message: 'not found!' });
    }
    res.json(restaurant);
  } catch (e) {
    res.status(500).send();
  }
})

router.post('/:id', async (req, res) => {
  if(!validate(req.params.restaurantId, req.params.title, req.params.reviewer, req.params.rating, req.params.dateOfReview, req.params.review)) {
    res.status(400).send()
  }

  try {
    let restaurant = null
    try { 
      restaurant = await create(
        req.params.restaurantId,
        req.params.title,
        req.params.reviewer,
        req.params.rating,
        req.params.dateOfReview,
        req.params.review
      )
    }
    catch (e) {
      res.status(400).json({ message: 'not found!' });
    }
    res.json(restaurant);
  } catch (e) {
    res.status(500).send();
  }
})

router.get('/review/:id', async (req, res) => {
  try {
    let review = null
    try { 
      review = await get(req.params.reviewId); 
    }
    catch (e) {
      res.status(404).json({ message: 'not found!' });
    }
    res.json(restaurant);
  } catch (e) {
    res.status(500).send();
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let restaurant = null
    try { 
      restaurant = await remove(req.params.reviewId); 
    }
    catch (e) {
      res.status(404).json({ message: 'not found!' });
    }
    res.json({reviewId: req.params.reviewId, deleted: true});
  } catch (e) {
    res.status(500).send();
  }
})

module.exports = router;