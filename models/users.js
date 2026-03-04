const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  xp: { type: Number, default: 0 },
  equipement: {
    type: String,
    enum: ["None", "Oeil nue", "Jumelles", "Lunette astronomique"],
    default: "None",
  },
  discoversAstres: [{ type: mongoose.Schema.Types.ObjectId, ref: "astres" }],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
