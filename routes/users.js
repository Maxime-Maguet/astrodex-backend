var express = require("express");
var router = express.Router();
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require('bcrypt');

//route Signup pour la premiere connexion du client

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // trouver si l'utilisateur existe déjà en BDD sinon le créer

  useStore.findOne({ username: req.body.username }).then(data => {
    if (data === null) {

      const hash = bcrypt.hashSync("password", 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
        token: uid2(32),
      });

// création de l'utilisateur avec le .save()

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {


// Faux si utilisateur déjà crée 
res.json({result: false, error: 'Users already Exists'});

}
  });
});

module.exports = router;
