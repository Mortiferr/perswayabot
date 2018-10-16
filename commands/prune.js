exports.run = async (client, message, args, level) => {
  const deleteCount = parseInt(args[0], 10);

  if (!deleteCount || deleteCount < 1 || deleteCount > 100)
    return message.reply("Please provide a number between 1 and 100 for the number of messages to delete");

  const fetched = await message.channel.fetchMessages({ limit: deleteCount });
  message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
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