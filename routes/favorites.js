const express = require('express');
const router = express.Router();
const connection = require('../db');

// Je veux récupérer tous les favoris d'un user
router.get('/:id', (req, res) => {
  const idUser = req.params.id;
  connection.query('SELECT o.* FROM offer AS o JOIN user_fav_offer AS uf ON uf.id_offer = o.id JOIN user AS u ON u.id = uf.id_user WHERE u.id = ?', idUser, (err, results) => {
    if (err) {
      res.sendStatus(500)
    }
    res.status(200).json(results);
  })
});

// Je veux créer un favoris
router.post('/:idUser/fav/:idOffers', (req, res) => {
  const idUser = req.params.idUser;
  const idOffer = req.params.idOffers;
  connection.query('INSERT INTO user_fav_offer SET id_user = ?, id_offer = ?', [idUser, idOffer], (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    return connection.query('SELECT * FROM user_fav_offer WHERE id = ?', results.insertId, (err2, records) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      return res.status(201).json(records[0])
    });
  })
});

// Supprimer un favoris
router.delete('/:id', (req, res) => {
  const idFav = req.params.id;
  connection.query('DELETE FROM user_fav_offer WHERE id = ?', idFav, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(202);
  })
});

module.exports = router;