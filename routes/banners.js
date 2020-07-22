const express = require('express');
const router = express.Router();
const connection = require('../db');

// Je veux récupérer toutes les bannières
router.get('/', (req, res) => {
  connection.query('SELECT * FROM carousel', (err, results) => {
    if (err) {
      res.sendStatus(500)
    }
    res.status(200).json(results);
  })
});

// Pouvoir consulter une bannière en renseignant son id dans l'url
router.get('/:id', (req, res) => {
  const idBanner = req.params.id;
  connection.query('SELECT * FROM carousel WHERE id = ?', idBanner, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// Je veux créer une bannière
router.post('/', (req, res) => {
  const formBody = req.body;
  connection.query('INSERT INTO carousel SET ?', formBody, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    connection.query('SELECT * FROM carousel WHERE id = ?', results.insertId, (err2, records) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const insertedOffer = records[0];
      const { password, ...offer } = insertedOffer;
      const host = req.get('host');
      const location = `http://${host}${req.url}/${offer.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(offer);
    });
  })
});

// Je veux pouvoir modifier une bannière
router.put('/:id', (req, res) => {
  const idBanner = req.params.id;
  const formBody = req.body;
  connection.query('UPDATE carousel SET ? WHERE id = ?', [formBody, idBanner], (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    connection.query('SELECT * FROM carousel WHERE id = ?', idBanner, (err2, records) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const insertedBanner = records[0];
      const host = req.get('host');
      const location = `http://${host}${req.url}/${insertedBanner.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(insertedBanner);
    });
  })
});

// Supprimer une bannière
router.delete('/:id', (req, res) => {
  const idBanner = req.params.id;
  connection.query('DELETE FROM carousel WHERE id = ?', idBanner, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(202);
  })
});

module.exports = router;