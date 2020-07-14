const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('../db');

// Je veux récupérer toutes les users
router.get('/', (req, res) => {
  connection.query('SELECT * FROM admin', (err, results) => {
    if (err) {
      res.sendStatus(500)
    }
    res.status(200).json(results);
  })
});

// Pouvoir consulter une annonce en renseignant son id dans l'url
router.get('/:id', (req, res) => {
  const idAdmin = req.params.id;
  connection.query('SELECT * FROM admin WHERE id = ?', idAdmin, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// Je veux créer mon profil admin
router.post('/', (req, res) => {
  if(req.body.email) {
      connection.query('SELECT * FROM admin WHERE email = ?', [req.body.email], (err, results) => {
          const hash = bcrypt.hashSync(req.body.password, 10);
          const formData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
          }
          if (err) {
              return res.status(500).json({error: err.message}); 
          } else {
  
              if (results[0] != undefined) {
                  return res.send("Cet email est déjà pris")
              } else {
                  // Hash password CHANGER Dans mySQL.
                  connection.query('INSERT INTO admin SET ?', formData, (err, results) => {
                      if (err) {
                          return res.status(500).json({
                              error: err.message,
                              sql: err.sql
                          });
                      }
                      return connection.query('SELECT * FROM admin WHERE id = ?', results.insertId, (err2, records) => {
                          if (err2) {
                              return res.status(500).json({
                                  error: err2.message,
                                  sql: err2.sql,
                              });
                          }
                          const insertedAdmin = records[0];
                          const { password, ...admin } = insertedAdmin;
                          const host = req.get('host');
                          const location = `http://${host}${req.url}/${admin.id}`;
                          return res
                          .status(201)
                          .set('Location', location)
                          .json(admin);
                      })
                  })
              }
          }
      })
  } else {
      return res.send("L'email est requis")
  }
});

// Je veux pouvoir modifier une annonce
router.put('/:id', (req, res) => {
  const idAdmin = req.params.id;
  const formBody = req.body;
  connection.query('UPDATE admin SET ? WHERE id = ?', [formBody, idAdmin], (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    connection.query('SELECT * FROM admin WHERE id = ?', idAdmin, (err2, records) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const insertedAdmin = records[0];
      const host = req.get('host');
      const location = `http://${host}${req.url}/${insertedAdmin.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(insertedAdmin);
    });
  })
});

// Supprimer une annonce
router.delete('/:id', (req, res) => {
  const idAdmin = req.params.id;
  connection.query('DELETE FROM admin WHERE id = ?', idAdmin, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(202);
  })
});

module.exports = router;