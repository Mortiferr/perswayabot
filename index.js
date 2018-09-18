// requires
const config = require('./config.json');
const Discord = require('discord.js');

// new Discord.Client instance
const client = new Discord.Client();

// variables
const secretChannelForHunterId = '491466153886220288';
const secretChannelForSurvivorId = "491494829558202368";

client.on('ready', async () => {
  console.log(`${client.user.username} loaded successfully.`)
});

client.on("message", message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'customhunter') {
    let hunterId = args[0];
    message.reply(`I've added you to the queue for Hunter. Remeber this is **NOT** a guarantee, it is a *queue*. Your ID you entered is: ${hunterId}`);
    client.channels
      .get(secretChannelForHunterId)
      .send(`${message.author} - ${hunterId}`)
  } else
    if (command === 'customsurvivor') {
      let survivorId = args[0];
      message.reply(`I've added you to the queue for Survivor. Remeber this is **NOT** a guarantee, it is a *queue*. Your ID you entered is: ${survivorId}`);
      client.channels
        .get(secretChannelForSurvivorId)
        .send(`${message.author} - ${survivorId}`)
    }
});

client.login(config.token)