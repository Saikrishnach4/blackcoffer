// server/src/routes/dataRoutes.js
const express = require('express');
const multer = require('multer');
const DataModel = require('../models/datamodels');

const router = express.Router();
const upload = multer();

// Fetch all data
router.get('/', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch data based on filters
router.get('/filtereddata', async (req, res) => {
  try {
    const { endYear, topics, sector, region, pestle, source, country, city } = req.query;
    const filters = {};

    if (endYear) filters.end_year = endYear;

    if (topics !== undefined && topics !== '') {
      filters.topic = Array.isArray(topics) ? { $in: topics } : topics;
    }

    if (sector) filters.sector = sector;
    if (region) filters.region = region;
    if (pestle) filters.pestle = pestle;
    if (source) filters.source = source;
    if (country) filters.country = country;
    if (city) filters.city = city;

    const data = await DataModel.find(filters);

    // Send the complete data that matches the specified filters
    res.json({ data });
  } catch (error) {
    console.error('Error retrieving filtered data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// Upload JSON file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const jsonFile = req.file;
    if (!jsonFile) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const jsonData = JSON.parse(jsonFile.buffer.toString());

    // Assuming that jsonData is an array of objects
    await DataModel.insertMany(jsonData);

    res.json({ success: true });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
