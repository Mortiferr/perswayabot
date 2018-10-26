const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  // const deleteCount = parseInt(args[0], 10);

  // if (!message.member.hasPermission('MANAGE_MESSAGES'))
  //   return message.channel.send('Sorry, but you do not have the **Manage Messages** permissions! If you think this is an error, contact an <@136943278854504448>');
  // if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES'))
  //   return message.channel.send('I do not have the **Manage Messages** permission in this server.');

  // if (!args[0]) return message.channel.send('You must specify a number of messages.');
  // if (args[0] > 100) return message.channel.send('Please provide a number less than 100.');
  // if (isNaN(args[0])) return message.channel.send('Please provide a correct number.');

  // message.delete(); // delete the original prune message

  // message.channel.bulkDelete(args[0]).then(() => {
  //   message.channel.send(`🗑 I deleted **${args[0]}** messages.`).then(message => message.delete(3000));
  // }).catch().catch((e) => message.channel.send('You can not delete messages older than 14 days.'));

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