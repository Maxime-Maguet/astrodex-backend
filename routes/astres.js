var express = require("express");
var router = express.Router();
const Astre = require("../models/astres");
const User = require("../models/users");


router.put('/capturer',(req, res) =>{
User.findOne ({ token: req.params.token }).then(user => {
        if (!user) {
            return res.json({ result: false, error: 'User not found' });
        }
        if(user.discoversAstres.includes(req.body.astreId)){
            res.json({result :false, message :"Astre déjà capturé !" })
        }else{

            user.discoversAstres.push(req.body.astreId);
             user.save().then(() => {
                            res.json({ result: true, message: "Super l'astre a été capturé" });
             }) 
        }
            });
        });
module.exports = router;
//id user et id planete avec find one et update res.json (astres capturé), par rapport a id de l'astre si discover include id de l'adstre
// astre deja capturé si id trouvé