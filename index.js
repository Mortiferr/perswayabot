const config = require('./config.json');
const Discord = require('discord.js');

// new Discord.Client instance
const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`${client.user.username} loaded successfully.`);
});

client.on('message', message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'custom') {
    let team = args[0];
    let id   = args[1];
    let ign  = args[2];
    let role = message.guild.roles.get(config.dev.roleId); // TODO: change in production
    let member = message.member;

    if (team === 'hunter') {
      if (message.member.roles.has(role.id)) {
        message.reply(
          `You're already in the queue. You can't join again. Sorry!`
        );
      }
      else {
        message.reply(
          `I've added you to the queue for **${team}**. Remember this is *NOT* a guarantee. Your ID you entered is: **${id}** and the IGN you entered is: **${ign}**.`
        );
        client.channels
          .get(config.dev.channelIds.hunters) // TODO: change in production
          .send(`${message.author} - ${id} - ${ign}`);
        member.addRole(role).catch(console.error);
      }
    }

    else if (team === 'survivor') {
      let role = message.guild.roles.get(config.dev.roleId); // TODO: change in production
      let member = message.member;
      if (message.member.roles.has(role.id)) {
        message.reply(
          `You're already in the queue. You can't join again. Sorry!`
        );
      } else {
        message.reply(
          `I've added you to the queue for **${team}**. Remember this is *NOT* a guarantee. Your ID you entered is: **${id}** and the IGN you entered is: **${ign}**.`
        );
        client.channels
          .get(config.dev.channelIds.survivors) // TODO: change in production
          .send(`${message.author} - ${id} - ${ign}`);
        member.addRole(role).catch(console.error);
      }
    }
  } 
});

client.login(config.dev.token); // TODO: change in production
