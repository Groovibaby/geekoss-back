const express = require('express');
const offers = require('./offers');
const categories = require('./categories');
const users = require('./users');
const admins = require('./admins');
const auth = require('./auth');
const stats = require(('./stats'));
const banners = require(('./banners'));
const favorites = require(('./favorites'));

const router = express.Router();

router.use('/offers', offers);
router.use('/categories', categories);
router.use('/users', users);
router.use('/admins', admins);
router.use('/auth', auth);
router.use('/stats', stats);
router.use('/banners', banners);
router.use('/favorites', favorites);

module.exports = router;