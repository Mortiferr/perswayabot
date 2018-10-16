exports.run = (client, message, args, level) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(`That ain't it, chief.`);

  let role = message.guild.roles.find(r => r.name === 'Queued');
  role.delete()
    .catch(console.error);
  message.guild.createRole({
    name: `Queued`,
    color: 0x00b894
  })
    .catch(console.error)
  message.reply(`Queue has been reset.`) 
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["reset"],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'resetqueue',
  category: 'Moderation',
  description: 'Reset the queue (for the !custom command). This command is only partially complete.',
  usage: 'reset(queue)'
}