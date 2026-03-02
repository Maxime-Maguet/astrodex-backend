var express = require("express");
var router = express.Router();
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require('bcrypt');


//route Signup pour la premiere connexion du client

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "password", "email"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // trouver si l'utilisateur existe déjà en BDD sinon le créer

  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {

      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
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

//POST /users/signin
router.post("/signin", (req, res) => {
const { username, password } = req.body;

//verif champs remplis
if(!username || !password ) {
    return res.json({ result: false, error: "Empty or Invalid Fields" });
}
//identification de l'utilisateur via username
User.findOne({ username: username }).then(data => {
    //utilisateur existe
    if (!data) {
        //username n'existe pas
        return res.json({ result: false, error: "Username does not exist" });
    }

    //utilisateur existe, on vérifie le mot de passe
    if (bcrypt.compareSync(password, data.password)) {
        res.json({ 
            result: true, 
            token: data.token,
            username: data.username 
        });
    } else {
        //mdp est faux
        res.json({ result: false, error: "Incorrect password" });
    }
});
});

module.exports = router;

