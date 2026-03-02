var express = require("express");
var router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt")

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



module.exports = router;
