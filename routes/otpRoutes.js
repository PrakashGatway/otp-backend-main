const express = require('express');
const { sendOTP, sendResume } = require('../controllers/otpController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Example route setup:

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/send-resume', upload.single('file'), sendResume);

module.exports = router;
