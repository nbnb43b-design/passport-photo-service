const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const uploadMiddleware = require('../middleware/upload');

router.post('/upload', uploadMiddleware.single('photo'), photoController.uploadPhoto);
router.post('/remove-bg', photoController.removeBackground);
router.post('/edit', photoController.editPhoto);
router.post('/change-clothes', photoController.changeClothes);

module.exports = router;
