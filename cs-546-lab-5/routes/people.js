const express = require('express');
const router = express.Router();
const { getPeople, getPersonById} = require("../data/axiosFunctions")

router.get('/:id', async (req, res) => {
  try {
    const person = await getPersonById(req.params.id);
    res.json(person);
  } catch (e) {
    res.status(404).json({ message: 'not found!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const people = await getPeople();
    res.json(people);
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
  // Not implemented
  res.status(501).send();
});

module.exports = router;
