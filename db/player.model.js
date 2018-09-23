const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playerBase = new Schema({
  ign: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Player', 'playerBase');