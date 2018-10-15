const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playerBase = new Schema({
  team: String,
  id: Number,
  ign: String
});

module.exports = mongoose.model('Player', playerBase);