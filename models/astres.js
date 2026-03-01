const mongoose = require("mongoose");

const astreSchema = mongoose.Schema({});

const Astre = mongoose.model("astres", astreSchema);

module.exports = Astre;
