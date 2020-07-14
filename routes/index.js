const express = require('express');
const offers = require('./offers');
const categories = require('./categories');
const users = require('./users');
const admins = require('./admins');
const auth = require('./auth');
const stats = require(('./stats'));

const router = express.Router();

router.use('/offers', offers);
router.use('/categories', categories);
router.use('/users', users);
router.use('/admins', admins);
router.use('/auth', auth);
router.use('/stats', stats);

module.exports = router;