module.exports = {
  name: 'thicc',
  description: 'thicc',
  args: false,
  cooldown: 1,
  execute(message, args, client) {
    Promise.all([
      message.react('🍑'),
      message.react('490772478700814336'),
    ])
      .catch(() => console.error('One of the emojis didn\'t react on the !thicc command.'));
  },
};