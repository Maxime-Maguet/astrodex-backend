var express = require("express");
var router = express.Router();
const Astre = require("../models/astres");

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
