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

  if (command === 'customhunter') {
    let arg1 = args[0];
    let arg2 = args[1];
    let role = message.guild.roles.get(config.dev.roleId); // TODO: change in production
    let member = message.member;
    if (message.member.roles.has(role.id)) {
      message.reply(
        `You're already in the queue. You can't join again. Sorry!`
      );
    } 
    else {
      message.reply(
        `I've added you to the queue for Hunter. Remember this is **NOT** a guarantee. Your ID you entered is: ${arg1} and the IGN you entered is: ${arg2}.`
      );
      client.channels
        .get(config.dev.channelIds.hunters) // TODO: change in production
        .send(`${message.author} - ${arg1} - ${arg2}`);
      member.addRole(role).catch(console.error);
    }
  } 
  else if (command === 'customsurvivor') {
    let arg1 = args[0];
    let arg2 = args[1];
    let role = message.guild.roles.get(config.dev.roleId); // TODO: change in production
    let member = message.member;
    if (message.member.roles.has(role.id)) {
      message.reply(
        `You're already in the queue. You can't join again. Sorry!`
      );
    } else {
      message.reply(
        `I've added you to the queue for Survivor. Remember this is **NOT** a guarantee. Your ID you entered is: ${arg1} and the IGN you entered is: ${arg2}.`
      );
      client.channels
        .get(config.dev.channelIds.survivors) // TODO: change in production
        .send(`${message.author} - ${arg1} - ${arg2}`);
      member.addRole(role).catch(console.error);
    }
  }
});

client.login(config.dev.token); // TODO: change in production
