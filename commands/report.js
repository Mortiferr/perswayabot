exports.run = (client, message, args, level) => {
  message.reply(`:no_entry_sign: Yo homes, this command isn't ready yet. :no_entry_sign:`)
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 'Administrator'
};

exports.help = {
  name: 'report',
  category: 'Main',
  description: 'Report another member of the discord.',
  usage: 'report [@user] [reason] (without brackets)'
}