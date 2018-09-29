module.exports = {
  name: 'info',
  description: 'Get information for the various command. Use help `!help`',
  args: true,
  cooldown: 0,
  execute(message, args) {
    let whichCommand = args[0];
    let whichSubCommand = args[1];

    if (whichCommand === 'custom' && whichSubCommand === 'hunter') {
      message.reply(`Copy this and fill in your information: \`!custom hunter 1234566 yourign\``);
    }
    if (whichCommand === 'custom' && whichSubCommand === 'survivor') {
      message.reply(`Copy this and fill in your information: \`!custom survivor 1234566 yourign\``);
    }

  },
};