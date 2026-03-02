const mongoose = require("mongoose");

const astreSchema = mongoose.Schema({
  name: String,
  type: String,
  description: String,
  rarity_level: {
    type: String,
    enum: ["Commune", "Rare", "Épique", "Légendaire"],
  },
  magnitude: Number,
  imageUrl: String,
});

const Astre = mongoose.model("astres", astreSchema);

module.exports = Astre;
