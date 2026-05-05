const express = require('express');
const router = express.Router();
const printController = require('../controllers/printController');

router.post('/arrange', printController.arrangePhotos);
router.post('/generate-pdf', printController.generatePDF);

module.exports = router;
