const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  token: String,
  avatar: {
    type: String,
    default: null,
  },
  xp: { type: Number, default: 0 },
  equipement: {
    type: String,
    enum: ["Oeil nu", "Jumelles", "Lunette astronomique"],
    default: "Oeil nu",
  },
  discoversAstres: [{ type: mongoose.Schema.Types.ObjectId, ref: "astres" }],
  capturedDates: [
    {
      astreId: { type: mongoose.Schema.Types.ObjectId, ref: "astres" },
      capturedAt: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
