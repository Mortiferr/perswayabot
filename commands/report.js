const mongoose = require('mongoose');
const playerBase = require('../db/player')
const ObjectID = require('mongodb').ObjectID;

let Player = mongoose.model('Player');
let mongodb = mongoDB = process.env.MONGODB_URI
let db = mongoose.connection;

const reportSchema = mongoose.Schema({
  __id: mongoose.Schema.Types.ObjectId,
  username: String,
  userId: String,
  reason: String,
  reportedBy: String,
  reportedById: String,
  time: String
});