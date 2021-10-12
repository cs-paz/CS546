const express = require('express');
const router = express.Router();
const { getStocks, getStockById } = require("../data/axiosFunctions")

router.get('/:id', async (req, res) => {
  try {
    const stock = await getStockById(req.params.id);
    res.json(stock);
  } catch (e) {
    res.status(404).json({ message: 'not found!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const stocks = await getStocks();
    res.json(stocks);
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
