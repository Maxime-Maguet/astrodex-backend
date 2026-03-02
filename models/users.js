const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
username : String,
email : String,
password: String,
token : String,
xp : Number,
equipement : String,
discoversAstres : {type: mongoose.Schema.Types.ObjectId, ref : "astres"}

});

const User = mongoose.model("users", userSchema);

module.exports = User;
