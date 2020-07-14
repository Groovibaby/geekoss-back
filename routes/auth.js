const express = require("express");
const router = express.Router();
const connection = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM admin WHERE email = ?",
    email,
    (err, admin) => {
      if (err) {
        res.status(500).send("Error email");
      } else {
        const samePassword = bcrypt.compareSync(password, admin[0].password);
        if (!samePassword) {
          res.status(500).send("Error password");
        } else {
          jwt.sign(
            { admin },
            process.env.DOKKU_JWT_KEY,
            {
              expiresIn: "2h",
            },
            (err, token) => {
              res.json({
                token,
              });
            }
          );
        }
      }
    }
  );
});

router.post("/", verifyToken, (req, res) => {
  //jwt.verify etc ...
  jwt.verify(req.token, process.env.DOKKU_JWT_KEY, (err, authData) => {
    if (err) {
      res.status(500).send("Access denied");
    } else {
      res.json({
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  // recupérer le token dans POSTMAN Authorisation array with text, token
  const bearerToken = req.headers["authorization"];
  if (typeof bearerToken !== "undefined") {
    const bearer = bearerToken.split(" ");
    req.token = bearer[1];
    // next middleware
    next();
  } else {
    res.status(500).send("Pas de token");
  }
}

module.exports = router;
