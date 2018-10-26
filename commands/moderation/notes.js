const Discord = require('discord.js');
const db = require('quick.db');
const send = require('quick.hook')

exports.run = async (client, message, args, level) => {
  message.reply(`no`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'notes',
  category: 'In Development',
  description: 'look up notes',
  usage: 'notes [@user] (without brackets)'
}