const express = require('express');
const router = express.Router();
const BasicSettings = require('../models/BasicSettings');

// CREATE settings - POST /api/basic-settings/create
router.post('/create-basic-settings', async (req, res) => {
  try {
    const exists = await BasicSettings.findOne();
    if (exists) {
      return res.status(400).json({ message: 'Settings already exist. Use update route.' });
    }

    const newSettings = new BasicSettings(req.body);
    await newSettings.save();
    res.status(201).json({ success: true, created: true, settings: newSettings });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// UPDATE settings - PUT /api/basic-settings/update/:id
router.put('/update-basic-settings', async (req, res) => {
    const id = '6877fc8d10c6abde4ac79280'

  try {
    const settings = await BasicSettings.findByIdAndUpdate(
        id,
      { $set: req.body },
      { new: true }
    );

    if (!settings) return res.status(404).json({ message: 'Settings not found' });

    res.json({ success: true, updated: true, settings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// GET settings - GET /api/basic-settings
router.get('/get-basic-settings', async (req, res) => {
  try {
    const settings = await BasicSettings.findOne();
    if (!settings) return res.status(404).json({ message: 'No settings found' });
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
