const router = require('express').Router();
const Empl = require('../models/model');
const Single1 = require('../models/single1');
const Single2 = require('../models/single2');
const Multiple = require('../models/multiple');

router.post('/login', async (req, res) => {
  const newEmpl = new Empl(req.body);
  let result = await Empl.findOneAndUpdate({emplKnox: req.body.emplKnox}, req.body, {new: true});
  if(!result) {
    result = await newEmpl.save();
  }
  return res.json(result);
})

router.get('/singlewin1', async (req, res) => {
  const result = await Single1.find({});
  if(result && result.length > 0) {
    return res.json(result[0])
  }
})

router.get('/singlewin2', async (req, res) => {
  const result = await Single2.find({});
  if(result && result.length > 0) {
    return res.json(result[0])
  }
})

router.get('/multiwin', async (req, res) => {
  const result = await Multiple.find({});
  if(result && result.length > 0) {
    return res.json(result[0])
  } else {
    return res.status(500);
  }
})

module.exports = router;