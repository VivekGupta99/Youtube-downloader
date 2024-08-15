const express = require('express');
const router = express.Router();

const publicController = require('../controllers/public');

router.get('/', publicController.startApi);
router.post("/api/v1/yt", publicController.postYoutube)

module.exports = router;