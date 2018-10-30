const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  let amount = parseInt(args[0]);
  amount = amount + 1

  if (isNaN(amount)) return message.channel.send(':warning: `Please supply a valid amount of messages to purge`');
  if (amount > 100) return message.channel.send(':warning: `Please supply a number less than 100`');

  try {
    message.channel.bulkDelete(amount)
      .then(() => {
        message.channel.send(`🗑 I deleted **${amount - 1}** messages.`)
          .then(() => {
            message => message.delete(3000)
          });
      });
  } catch (error) {
    throw error;
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["purge"],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'prune',
  category: 'Moderation',
  description: 'Prune or purge messages.',
  usage: 'purge [#] (without brackets)'
}