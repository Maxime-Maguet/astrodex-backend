var express = require("express");
var router = express.Router();
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
//route Signup pour la premiere connexion du client

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "password", "email"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // trouver si l'utilisateur existe déjà en BDD sinon le créer

  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32),
      });

      // création de l'utilisateur avec le .save()

      newUser
        .save()
        .then(newDoc => {
          res.json({
            result: true,
            token: newDoc.token,
            email: newDoc.email,
            username: newDoc.username,
            xp: newDoc.xp,
          });
        })
        .catch(err => {
          res.json({ result: false, error: "User already exists" });
        });
    } else {
      // Faux si utilisateur déjà crée
      res.json({ result: false, error: "Users already Exists" });
    }
  });
});

//POST /users/signin
router.post("/signin", (req, res) => {
  const { username, password } = req.body;

  //verif champs remplis
  if (!username || !password) {
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
        username: data.username,
        xp: data.xp,
        avatar: data.avatar,
      });
    } else {
      console.log("USER LOGIN:", data);
      //mdp est faux
      res.json({ result: false, error: "Incorrect password" });
    }
  });
});

router.put("/updateUser", (req, res) => {
  User.findOne({ token: req.body.token }).then(user => {
    if (!user) {
      return res.json({ result: false, error: "user not found" });
    }
    if (req.body.equipement) user.equipement = req.body.equipement;
    if (req.body.xp) user.xp = user.xp + Number(req.body.xp);
    user
      .save()
      .then(userUpdate => {
        res.json({
          result: true,
          equipement: userUpdate.equipement,
          xp: userUpdate.xp,
        });
      })
      .catch(err => {
        res.json({ result: false, error: "Invalid equipment" });
      });
  });
});

router.get("/profile/:token", (req, res) => {
  User.findOne({ token: req.params.token })
    .populate("discoversAstres")
    .then(user => {
      if (user) {
        res.json({
          result: true,
          user: {
            name: user.username,
            xp: user.xp,
            capturedAstres: user.discoversAstres,
            equipement: user.equipement,
          },
        });
      } else {
        res.json({ result: false, error: "User not found" });
      }
    });
});

router.post("/upload", async (req, res) => {
  const photoPath = `./tmp/${uniqid()}.jpg`;

  const resultMove = await req.files.photoFromFront.mv(photoPath);

  if (!resultMove) {
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);

    fs.unlinkSync(photoPath);

    const user = await User.findOne({ token: req.body.token });

    if (!user) {
      return res.json({ result: false, error: "User not found" });
    }

    user.avatar = resultCloudinary.secure_url;

    await user.save();
    console.log("AVATAR SAVED:", user.avatar);

    res.json({
      result: true,
      avatar: resultCloudinary.secure_url,
    });
  } else {
    res.json({ result: false, error: resultMove });
  }
});

module.exports = router;
