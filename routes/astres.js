var express = require("express");
var router = express.Router();
const Astre = require("../models/astres");
const User = require("../models/users");

router.put("/capturer", (req, res) => {
  User.findById(req.body.userId).then((user) => {
    if (!user) {
      return res.json({ result: false, error: "User not found" });
    }
    if (user.discoversAstres.includes(req.body.astreId)) {
      res.json({ result: false, message: "Astre déjà capturé !" });
    } else {
      user.discoversAstres.push(req.body.astreId);
      user.save().then((user) => {
        user.populate("discoversAstres").then((userAstres) => {
          res.json({ result: true, user: userAstres });
        });
      });
    }
  });
});

router.get("/", (req, res) => {
  Astre.find()
    .then((data) => {
      res.json({ result: true, astres: data });
    })
    .catch((error) => {
      res.json({ result: false, error: error.message });
    });
});

module.exports = router;
