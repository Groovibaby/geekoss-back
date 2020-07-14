const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/admins', (req, res) => {
  connection.query('SELECT COUNT(*) AS admins FROM admin', (err, results) => {
    if (err) {
      res.sendStatus(500)
    }
    res.status(200).json(results);
  })
});

router.get('/users', (req, res) => {
  connection.query('SELECT COUNT(*) AS users FROM user', (err, results) => {
    if (err) {
      res.sendStatus(500)
    }
    res.status(200).json(results);
  })
});

router.get('/offers', (req, res) => {
  connection.query('SELECT COUNT(*) AS offers FROM offer', (err, results) => {
    if (err) {
      res.sendStatus(500)
    }
    res.status(200).json(results);
  })
});

module.exports = router;