const Discord = require('discord.js')
const mongoose = require('mongoose');
const playerBase = require('../db/player')
const ObjectID = require('mongodb').ObjectID;
let Player = mongoose.model('Player');
let mongodb = mongoDB = process.env.MONGODB_URI

let db = mongoose.connection;

module.exports = {
  name: 'lookup',
  description: 'Lookup your status in the tournament.',
  args: true,
  cooldown: 5,
  execute(message, args, client) {
    let lookupParam = args[0];
    let lookupItem = args[1];
    let collection = db.collection('playerBase');

    Player.findOne({
      lookupParam: lookupItem 
    }, (err, res) => {
      if (err) console.error(err);

      let embed = new Discord.RichEmbed()
        .setAuthor('Tournament Database Request')
        .setColor('#FCE300')
      if (!res) {
        embed.addField('No registration found', 'You are not registered for the tournament. Do `!tourney` to sign up!', true)
        return message.channel.send(embed);
      }
      else {
        embed.addField('Registration found', 'Coming soon', true)
      }
    })

    if (!lookupItem) {
      message.reply(`You didn't provide your IGN or ID.`)
      return
    }
    message.reply(`This command is still a work in progress and is not finished yet! DM <@136943278854504448> to have him check for you.\nCopy and paste this:\n\n\`Am I in the tournament entry list? ${lookupParam}: ${lookupItem}\``)
  },
};