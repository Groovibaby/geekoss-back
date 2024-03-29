const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const connection = require('../db');

// Je veux récupérer tous les users
router.get('/', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500)
    }
    res.status(200).json(results);
  })
});

// Pouvoir consulter un user en renseignant son id dans l'url
router.get('/:id', (req, res) => {
  const idUser = req.params.id;
  connection.query('SELECT * FROM user WHERE id = ?', idUser, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// Je veux créer mon profil
router.post('/', (req, res) => {
  if(req.body.email) {
      connection.query('SELECT * FROM user WHERE email = ?', [req.body.email], (err, results) => {
          const hash = bcrypt.hashSync(req.body.password, 10);
          const formData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            pseudo: req.body.pseudo
          }
          if (err) {
              return res.status(500).json({error: err.message}); 
          } else {
              if (results[0] != undefined) {
                  return res.send("Cet email est déjà pris")
              } else {
                  connection.query('INSERT INTO user SET ?', formData, (err, results) => {
                      if (err) {
                          return res.status(500).json({
                              error: err.message,
                              sql: err.sql
                          });
                      }
                      return connection.query('SELECT * FROM user WHERE id = ?', results.insertId, (err2, records) => {
                          if (err2) {
                              return res.status(500).json({
                                  error: err2.message,
                                  sql: err2.sql,
                              });
                          }
                          const insertedUser = records[0];
                          const { password, ...user } = insertedUser;
                          const host = req.get('host');
                          const location = `http://${host}${req.url}/${user.id}`;
                          return res
                          .status(201)
                          .set('Location', location)
                          .json(user);
                      })
                  })
              }
          }
      })
  } else {
      return res.send("L'email est requis")
  }
});

// Je veux pouvoir modifier un user
router.put('/:id', (req, res) => {
  const idUser = req.params.id;
  const formBody = req.body;
  connection.query('UPDATE user SET ? WHERE id = ?', [formBody, idUser], (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    connection.query('SELECT * FROM user WHERE id = ?', idUser, (err2, records) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const insertedUser = records[0];
      const host = req.get('host');
      const location = `http://${host}${req.url}/${insertedUser.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(insertedUser);
    });
  })
});

// Supprimer un user
router.delete('/:id', (req, res) => {
  const idUser = req.params.id;
  connection.query('DELETE FROM user WHERE id = ?', idUser, (err, results) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(202);
  })
});

module.exports = router;