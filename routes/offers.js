const express = require('express');
const router = express.Router();
const connection = require('../db');

// Je veux récupérer toutes les users
router.get('/', (req, res) => {
  connection.query('SELECT * FROM offer', (err, results) => {
    if (err) {
      res.sendStatus(500)
    }
    res.status(200).json(results);
  })
});

// Pouvoir consulter une annonce en renseignant son id dans l'url
router.get('/:id', (req, res) => {
  const idOffer = req.params.id;
  connection.query('SELECT * FROM offer WHERE id = ?', idOffer, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// Pouvoir consulter toutes les annonces d'un user
router.get('/user/:id', (req, res) => {
  const idUser = req.params.id;
  connection.query('SELECT * FROM offer WHERE user_id = ?', idUser, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// Je veux créer une annonce
router.post('/', (req, res) => {
  const formBody = req.body;
  connection.query('INSERT INTO offer SET ?', formBody, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    return connection.query('SELECT * FROM offer WHERE id = ?', results.insertId, (err2, records) => {
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
        .json(insertedOffer);
    });
  })
});

// Je veux pouvoir modifier une annonce
router.put('/:id', (req, res) => {
  const idOffer = req.params.id;
  const formBody = req.body;
  connection.query('UPDATE offer SET ? WHERE id = ?', [formBody, idOffer], (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    connection.query('SELECT * FROM offer WHERE id = ?', idOffer, (err2, records) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const insertedOffer = records[0];
      const host = req.get('host');
      const location = `http://${host}${req.url}/${insertedOffer.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(insertedOffer);
    });
  })
});

// Supprimer une annonce
router.delete('/:id', (req, res) => {
  const idOffer = req.params.id;
  connection.query('DELETE FROM offer WHERE id = ?', idOffer, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(202);
  })
});

module.exports = router;