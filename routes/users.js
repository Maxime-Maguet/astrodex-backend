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

//POST /users/signin
router.post("/signin", (req, res) => {
const { username, password } = req.body;

//verif champs remplis
if(!username || !password ) {
    return res.json({ result: false, error: "Empty or Invalid Fields" });
}
//identification de l'utilisateur via username
User.findOne({ username: username }).then(data => {
    //SI utilisateur existe ET que le password correspond
    if (data && bcrypt.compareSync(password, data.password)) {
        //on retourne le token et le username
        res.json({ 
            result: true, 
            token: data.token,
            username:data.username 
        });
    } else {
        //si utilisateur non identitfié, erreur affiché
        res.json({ result: false, error: "User not found or incorrect password" });
    }
});
});

// Faux si utilisateur déjà crée 
res.json({result: false, error: 'Users already Exists'});

}
  });
});

module.exports = router;
