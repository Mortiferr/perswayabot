exports.run = async (client, message, args, level) => {
    let member = message.mentions.members.first();
    let reason = args.slice(1).join(' ');

    if (!member) return message.reply(`Please mention a member to ban.`);
    if (member.user.id == message.author.id) return message.reply(`You can't ban yourself.`);
    if (!member.bannable) return message.reply(`I cannot ban this user! Do they have a higher role? Do I have ban permissions?`);
    if (!reason) return message.reply(`You must provide a reason.`);

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author}, I couldn't ban that user because of \`${error}\``));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    client.channels
      .find(c => c.name === 'logs')
      .send(`${message.author} banned ${message.author.tag} for ${reason}`)
      .catch(console.error)
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'ban',
  category: 'Moderation',
  description: 'Ban a user from the server.',
  usage: 'ban @user reason'
}