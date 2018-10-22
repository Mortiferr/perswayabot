const Discord = require('discord.js');
const send = require('quick.hook');
const icon = `https://i.imgur.com/BtcxmoF.png`;

exports.run = (client, message, args, level) => {
  const suggestion = message.content.split(' ').slice(1).join(' ');
  const submitter = message.member.user.tag.slice(0, -5);

  send(message.channel, `Are you sure you want to send the suggestion:\n\n\`\`\`${suggestion}\`\`\``, {
    name: 'Suggestions System',
    icon: icon
  })
  // message.channel.send(`Are you sure you want to send the suggestion:\n\n\`\`\`${suggestion}\`\`\``)
  message.channel.awaitMessages(response => message.author == response.author && response.content.toLowerCase() === 'yes', {
      max: 1,
      time: 30000,
      errors: ['time'],
    })
    .then(async (collected, sent) => {
      // message.channel.send(`Sending...`)
      try {
        send(message.channel, `Okay, sent.`, {
            name: 'Suggestions System',
            icon: icon
          })
          .then(message => message.delete(3000));
      } catch (error) {
        console.error(error)
      }
      const embed = new Discord.RichEmbed()
        .setAuthor(`Suggestion • Sent by ${submitter}`)
        .setDescription(`${suggestion}`)
        .setColor(`0x00AE86`)
        .setFooter(`Vote below!`)
      try {
        // const message = await client.channels
        //   .find(c => c.name === 'ideas-and-requests')
        //   .send(embed);
        const message = await send(client.channels.find(c => c.name === 'ideas-and-requests'), embed, {
          name: 'Suggestions System',
          icon: icon
        })
        await message.react('👍')
        await message.react('👎')
        await send(client.channels.find(c => c.name === 'general'), `Check out the new suggestion in <#489214732700483584>. We value your opinion.`, {
          name: 'Suggestions System',
          icon: icon
        })
      } catch (error) {
        console.error(error);
      }
    })
    .catch(() => {
      // message.channel.send(`You didn't respond within the time limit. Suggestion not sent.`)
      send(message.channel, `You didn't respond within the time limit. Suggestion not sent.`, {
        name: 'Suggestions System',
        icon: icon
      })
    })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["suggest"],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'suggestion',
  category: 'Moderation',
  description: 'Adds a suggestion to be voted on. Will ask for confirmation.',
  usage: 'suggestion [suggestion contents] (without brackets)'
}