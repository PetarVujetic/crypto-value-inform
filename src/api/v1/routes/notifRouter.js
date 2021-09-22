const express = require('express');
const router = express.Router()
const { notif } = require('../controllers/notif');

router.route('/notify')
  .post(notif)

module.exports = router;