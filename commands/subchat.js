exports.run = (client, message, args, level) => {
  message.channel.send('Are you sure you want to send an announcement to all subscribers? Type `YES` to confirm.')
    .then(() => {
      message.channel.awaitMessages(response => message.author == response.author && response.content.toLowerCase() === 'yes', {
        max: 1,
        time: 30000,
        errors: ['time'],
      })
        .then((collected, sent) => {
          message.channel.send(`Sending...`)
            .then(sent => { sent.edit(`Sent!`); })
            .catch(console.error)
          client.channels
            .find(c => c.name === 'announcements')
            .send(`<@&489224374885416970> - Persway is doing a subscriber chat! Join to ask questions.`)
            .catch(console.error)
        })
        .catch(() => {
          message.channel.send(`You didn't respond within the time limit. Announcement not sent.`)
        })
    })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'subchat',
  category: 'Moderation',
  description: 'Starts a subscriber chat. Will ask for confirmation.',
  usage: 'subchat'
}