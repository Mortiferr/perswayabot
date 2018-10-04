module.exports = {
  name: 'subchat',
  description: 'Staff only.',
  usage: '',
  cooldown: 2,
  execute(message, args, client) {
    if (message.member.hasPermission('KICK_MEMBERS')) {
      message.channel.send('Are you sure you want to send an announcement to all subscribers? Type `YES` in ALL CAPS to confirm.')
        .then(() => {
          message.channel.awaitMessages(response => response.content === 'YES', {
            max: 1,
            time: 30000,
            errors: ['time'],
          })
          .then((collected) => {
            message.channel.send(`Sending!`);
            client.channels
              .find(c => c.name === 'announcements')
              .send(`<@&489224374885416970> - Persway is doing a subscriber chat! Join to ask questions.`)
              .catch(console.error)
            message.channel.send(`Sent!`);
          })
          .catch(() => {
            message.channel.send(`You didn't respond within the time limit. Announcement not sent.`)
          })
        })
    }
  },
}; 