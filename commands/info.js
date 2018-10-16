exports.run = (client, message, args, level) => {
  let whichCommand = args[0];
  let whichSubCommand = args[1];

  if (whichCommand === 'custom' && whichSubCommand === 'hunter') {
    message.reply(`Copy this and fill in your information: \`!custom hunter 1234566 yourign\``);
  }
  if (whichCommand === 'custom' && whichSubCommand === 'survivor') {
    message.reply(`Copy this and fill in your information: \`!custom survivor 1234566 yourign\``);
  }

  if (whichCommand === 'tourney') {
    // message.channel.send(`Bacon ipsum dolor amet turducken filet mignon strip steak jerky, ham hock tri-tip swine andouille ground round meatloaf beef ribs pork loin. Shoulder buffalo cupim porchetta bresaola, beef ribs venison prosciutto chuck brisket chicken flank. Doner ribeye venison kevin prosciutto chicken fatback landjaeger. Turducken spare ribs shoulder, andouille pancetta meatloaf pastrami ground round turkey pork belly tri-tip tail short ribs. Salami andouille capicola hamburger jowl, ham hock t-bone short ribs cow biltong. Salami bresaola andouille beef meatball tongue ham jerky doner pork loin.`);
    const infoEmbed = {
      color: 0xFCE300,
      author: {
        name: 'Documentation'
      },
      fields: [
        {
          name: '!tourney command',
          value: 'Bacon ipsum dolor amet turducken filet mignon strip steak jerky, ham hock tri-tip swine andouille ground round meatloaf beef ribs pork loin.'
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