var express = require("express");
var router = express.Router();
const Astre = require("../models/astres");
const User = require("../models/users");

router.put("/capturer", (req, res) => {
  User.findOne({ token: req.body.token })
    .then((user) => {
      if (!user) {
        return res.json({ result: false, error: "User not found" });
      }
      if (user.discoversAstres.includes(req.body.astreId)) {
        res.json({ result: false, message: "Astre déjà capturé !" });
      } else {
        user.discoversAstres.push(req.body.astreId);
        user.capturedDates.push({ astreId: req.body.astreId });
        user.save().then((user) => {
          user.populate("discoversAstres").then((userAstres) => {
            res.json({ result: true, user: userAstres });
          });
        });
      }
    })
    .catch((err) => res.json({ result: false, error: err.message }));
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

router.delete("/:token/:astreId", (req, res) => {
  User.findOneAndUpdate(
    { token: req.params.token },
    { $pull: { discoversAstres: req.params.astreId } },
    { new: true },
  )
    .populate("discoversAstres")
    .then((userUpdate) => {
      if (!userUpdate) {
        return res.json({ result: false, message: "User not find" });
      }
      res.json({ result: true, user: userUpdate });
    })
    .catch((err) => res.json({ result: false, error: err.message }));
});

router.get("/info", (req, res) => {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.INFONASA_API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      res.json({
        title: data.title,
        image: data.url,
        description: data.explanation,
      });
    });
});

// Nous avons voulu ajouter la traduction du texte, mais nous n'avons pas trouvé d'API gratuite

// router.get("/info", (req, res) => {
//   fetch(
//     `https://api.nasa.gov/planetary/apod?api_key=${process.env.INFONASA_API_KEY}`,
//   )
//     .then(response => response.json())
//     .then(data => {
//       fetch("https://libretranslate.com/translate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           q: data.explanation,
//           source: "auto",
//           target: "fr",
//           format: "text",
//         }),
//       })
//         .then(response => response.json())
//         .then(trad => { console.log(trad);
//           res.json({
//             title: data.title,
//             image: data.url,
//             description:  trad.translatedText,
//           });
//         });
//     });
// });




module.exports = router;
