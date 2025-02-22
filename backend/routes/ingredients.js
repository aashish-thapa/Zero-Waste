const express = require('express');
const {classifyImage} = require('../utils/tensorflowUtils')
const Ingredient = require('../models/Ingredient');
const router = express.Router();
// Scan the image
router.post('/scan', async (req, res)=>{
  try{
    const {ImagePath} = req.body;
    if(!ImagePath) return res.status(400).json({error: 'Image path is required'});
    const predictions = await classifyImage(ImagePath);
    res.json({predictions});

  }catch(err){
    console.error(err);
    res.status(500).json({error : 'Failed to process image'});

  }
});

router.post('/', async (req, res) => {
  try {
      const { name, expirationDate, userId } = req.body;
      const ingredient = new Ingredient({ name, expirationDate, userId });
      await ingredient.save();
      res.status(201).json(ingredient);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});


// Get all ingredients for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({ userId: req.params.userId });
    res.json(ingredients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an ingredient by its ID
router.delete('/:id', async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (ingredient) {
      res.json({ message: 'Ingredient deleted successfully' });
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
