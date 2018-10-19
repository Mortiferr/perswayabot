const mongoose = require('mongoose');
exports.run = (client, message, args, level) => {
  const Warning = mongoose.model('Warning', {
    user: String,
    mod: String,
    reason: String
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'warn',
  category: 'In Development',
  description: 'in progress',
  usage: 'warn [@user] [reason] (without brackets)'
}