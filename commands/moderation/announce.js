exports.run = (client, message, args, level) => {
  message.delete();
  message.channel.send(`${args.join(" ")}`);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Administrator'
};

exports.help = {
  name: 'announce',
  category: 'Moderation',
  description: 'Make the bot your minion.',
  usage: 'say [message]'
}