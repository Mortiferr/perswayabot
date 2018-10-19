exports.run = (client, message, args, level) => {
  let whichCommand = args[0];
  let whichSubCommand = args[1];

  if (!whichCommand && !whichSubCommand) {
    message.reply(`You didn't specify a subcategory.\nCategories:\n  \n- custom  \n- tourney`);
    return;
  }

  if (whichCommand === 'custom' && !whichSubCommand) {
    message.reply(`Specify a sub-command: \`!info custom hunter / survivor\``)
    return;
  }

  if (whichCommand === 'custom' && whichSubCommand === 'hunter') {
    message.reply(`Copy this and fill in your information: \`!custom hunter 1234566 yourign\``);
  }
  if (whichCommand === 'custom' && whichSubCommand === 'survivor') {
    message.reply(`Copy this and fill in your information: \`!custom survivor 1234566 yourign\``);
  }

  if (whichCommand === 'tourney') {
    const infoEmbed = {
      color: 0xFCE300,
      author: {
        name: 'Documentation'
      },
      fields: [
        {
          name: '!tourney command',
          value: 'Coming soon.'
        }
      ],
      footer: {
        text: 'You can always contact a staff member if you need additional assistance.'
      }
    }
    message.channel.send({ embed: infoEmbed }).catch(console.error);
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["information"],
  permLevel: 'User'
};

exports.help = {
  name: 'info',
  category: 'Main',
  description: 'Get information about certain topics.',
  usage: 'info [subtopic]'
}