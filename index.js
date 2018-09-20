// requires
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
  const commandActive = true;

  if (command === 'start') {
    message.reply(`The start command works.`);
  }

  if (
    command === 'customhunter' ||
    commandActive === true ||
    commandActive === true
  ) {
    let arg1 = args[0];
    let arg2 = args[1];
    let role = message.guild.roles.get(config.roleId);
    let member = message.member;
    const commandActive = false;
    if (message.member.roles.has(role.id)) {
      message.reply(
        `You're already in the queue. You can't join again. Sorry!`
      );
    } else {
      message.reply(
        `I've added you to the queue for Hunter. Remember this is **NOT** a guarantee. Your ID you entered is: ${arg1} and the IGN you entered is: ${arg2}.`
      );
      client.channels
        .get(config.channelIds.hunters)
        .send(`${message.author} - ${arg1} - ${arg2}`);
      member.addRole(role).catch(console.error);
    }
  } else if (command === 'customsurvivor') {
    let arg1 = args[0];
    let arg2 = args[1];
    let role = message.guild.roles.get(config.roleId);
    let member = message.member;
    const commandActive = false;
    if (message.member.roles.has(role.id)) {
      message.reply(
        `You're already in the queue. You can't join again. Sorry!`
      );
    } else {
      message.reply(
        `I've added you to the queue for Survivor. Remember this is **NOT** a guarantee. Your ID you entered is: ${arg1} and the IGN you entered is: ${arg2}.`
      );
      client.channels
        .get(config.channelIds.survivors)
        .send(`${message.author} - ${arg1} - ${arg2}`);
      member.addRole(role).catch(console.error);
    }
  } else if (command === 'resetqueue') {
    // Remove all from Queued role

    // Purge messages
    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1])
      ? parseInt(message.content.split(' ')[1])
      : parseInt(message.content.split(' ')[2]);
    if (!amount)
      return message.reply(
        `Must specify an amount to delete! *Note: Discord limits you to a maximum of 100 at a time.*`
      );
    if (!amount && !user)
      return message.reply(
        `Must specify a user and amount, or just an amount, of messages to purge!`
      );
    message.channel.fetchMessages({ limit: 100 }).then(messages => {
      if (user) {
        const filterBy = user ? user.id : Client.user.id;
        messages = messages
          .filter(m => m.author.id === filterBy)
          .array()
          .slice(0, amount);
      }
      message.channel
        .bulkDelete(messages)
        .catch(error => console.log(error.stack));
    });
  }
});

client.login(config.token);
