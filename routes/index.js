const { Router } = require('express');
const Add = require('../models/addModel');

const router = Router();

router.get('/api/all', async (req, res) => {
  try {
    const Adds = await Add.find({});
    res.status(200).json(Adds);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error - ${error}`);
  }
});

router.get('/api/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const add = await Add.findById(id);
    res.status(200).json(add);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error - ${error}`);
  }
});

module.exports = router;
