// requires
const config = require('./config.json');
const Discord = require('discord.js');

// new Discord.Client instance
const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`${client.user.username} loaded successfully.`)
});

client.on("message", message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'customhunter') {
    let arg1 = args[0];
    let role = message.guild.roles.get(config.roleId);
    let member = message.member;
    if (message.member.roles.has(role.id)) {
      message
        .reply(
          `You're already in the queue. You can't join again. Sorry!`
        );
    }
    else {
      message
        .reply(
          `I've added you to the queue for Hunter. Remember this is **NOT** a guarantee. Your ID you entered is: ${arg1}`
        );
      client.channels
        .get(config.channelIds.hunters)
        .send(`${message.author} - ${arg1}`);
      member
        .addRole(role)
        .catch(console.error);
    }
  } else
  if (command === 'customsurvivor') {
    let arg1 = args[0];
    let role = message.guild.roles.get(config.roleId);
    let member = message.member;
    if (message.member.roles.has(role.id)) {
      message.reply(`You're already in the queue. You can't join again. Sorry!`);
    } else {
      message.reply(`I've added you to the queue for Survivor. Remember this is **NOT** a guarantee. Your ID you entered is: ${arg1}`);
      client.channels
        .get(config.channelIds.survivors)
        .send(`${message.author} - ${arg1}`);
      member.addRole(role).catch(console.error);
    }
  } else
  if (command === 'resetqueue') {

    // Remove all from Queued role

    // Purge messages
    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    if (!amount) return message.reply('Must specify an amount to delete! *Note: Discord limits you to a maximum of 100 at a time.*');
    if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
    message.channel.fetchMessages({
      limit: 100,
    }).then((messages) => {
      if (user) {
        const filterBy = user ? user.id : Client.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      }
      message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });
  } else
  if (command === "beginqueue") {
    message.guild.createRole({
      data: {
        name: "Queued",
        hoist: true,
        mentionable: true,
        permissions: {
          CREATE_INSTANT_INVITE: true,
          KICK_MEMBERS: true,
          BAN_MEMBERS: true,
          ADMINISTRATOR: true,
          MANAGE_CHANNELS: true,
          MANAGE_GUILD: true,
          ADD_REACTIONS: true,
          READ_MESSAGES: true,
          SEND_MESSAGES: true,
          SEND_TTS_MESSAGES: true,
          MANAGE_MESSAGES: true,
          EMBED_LINKS: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true,
          MENTION_EVERYONE: true,
          EXTERNAL_EMOJIS: true,
          CONNECT: true,
          SPEAK: true,
          MUTE_MEMBERS: true,
          DEAFEN_MEMBERS: true,
          MOVE_MEMBERS: true,
          USE_VAD: true,
          CHANGE_NICKNAME: true,
          MANAGE_NICKNAMES: true,
          MANAGE_ROLES_OR_PERMISSIONS: true,
          MANAGE_WEBHOOKS: true,
          MANAGE_EMOJIS: true
        }
      }
    })
  }
});

client.login(config.token)