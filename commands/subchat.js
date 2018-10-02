//489224374885416970
module.exports = {
  name: 'subchat',
  description: 'Staff only.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 2,
  execute(message, args, client) {
    if (message.member.hasPermission('KICK_MEMBERS')) {
      client.channels
        .find(c => c.name === 'announcements')
        .send(`<@&489224374885416970> - Persway is doing a subscriber chat! Join to ask questions.`)
        .catch(console.error)
    }
  },
}; 