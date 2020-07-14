const express = require('express');
const router = express.Router();
const connection = require('../db');

// Je veux récupérer toutes les users
router.get('/', (req, res) => {
  connection.query('SELECT * FROM category', (err, results) => {
    if (err) {
      res.sendStatus(500)
    }
    res.status(200).json(results);
  })
});

// Pouvoir consulter une catégorie en renseignant son id dans l'url
router.get('/:id', (req, res) => {
  const idCategory = req.params.id;
  connection.query('SELECT * FROM category WHERE id = ?', idCategory, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// Je veux créer mon profil
router.post('/', (req, res) => {
  const formBody = req.body;
  connection.query('INSERT INTO category SET ?', formBody, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    connection.query('SELECT * FROM category WHERE id = ?', results.insertId, (err2, records) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const insertedCategory = records[0];
      const { password, ...category } = insertedCategory;
      const host = req.get('host');
      const location = `http://${host}${req.url}/${category.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(category);
    });
  })
});

// Je veux pouvoir modifier une catégorie
router.put('/:id', (req, res) => {
  const idCategory = req.params.id;
  const formBody = req.body;
  connection.query('UPDATE category SET ? WHERE id = ?', [formBody, idCategory], (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    connection.query('SELECT * FROM category WHERE id = ?', idCategory, (err2, records) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const insertedCategory = records[0];
      const host = req.get('host');
      const location = `http://${host}${req.url}/${insertedCategory.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(insertedCategory);
    });
  })
});

// Supprimer une catégorie
router.delete('/:id', (req, res) => {
  const idCategory = req.params.id;
  connection.query('DELETE FROM category WHERE id = ?', idCategory, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(202);
  })
});

module.exports = router;