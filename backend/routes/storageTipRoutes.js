const express = require('express');
const StorageTip = require('../models/StorageTip');
const router = express.Router();

// GET: Fetch storage tips for an ingredient
router.get('/:ingredient', async (req, res) => {
  try {
    const tips = await StorageTip.find({ ingredient: req.params.ingredient });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch storage tips' });
  }
});

module.exports = router;
