const dotenv = require('dotenv').config();
const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');
const mongoose = require('mongoose');
const playerBase = require('./db/player')
const ObjectID = require('mongodb').ObjectID;

let prefix = config.prefix;

let mongodb = mongoDB = process.env.MONGODB_URI

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
  console.log('Connection successful.');
});

let Player = mongoose.model('Player');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', async () => {
  console.log(`${client.user.username} is now online.`);
  client.user.setPresence({ game: { name: 'Dead by Daylight' }, status: 'online' })
    .catch(console.error);
});

client.on('message', message => {

  if (message.author.bot) return;

  const shortLinks = ["goo.gl", "shorte.st", "adf.ly", "bc.vc", "bit.ly", "bit.do", "soo.gd", "7.ly", "5.gp", "tiny.cc", "ouo.io", "zzb.bz", "adfoc.us", "my.su"]
  const swearWords = ["faggot", "gini", "kike", "n1gga", "n1gger", "nigg3r", "nigga", "nigger", "retard", "niqqa", "n1qqa", "niqqer", "n1qqer"]

  if (message.content.toLowerCase().includes('thicc')) {
    Promise.all([
      message.react('🍑'),
      message.react('490772478700814336'),
    ])
      .catch(() => console.error('One of the emojis didn\'t react on thicc.'));
  }

  if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
    message.delete();
    message.author.send(`Do not use that word in Perswayable's Discord. Thanks.`);
    client.channels
      .find(c => c.name === 'logs')
      .send(`${message.author} posted a racist / sexist / disablist slur that was deleted by ${client.user.username}. They've been warned via DM. Message: \`${message}\``)
      .catch(console.error)
  }

  if (shortLinks.some(word => message.content.includes(word))) {
    message.delete();
    message.author.send(`Hey, please don't send short links in Perswayable's Discord. You can post the link, just send the full length one. Thanks :)`);
    client.channels
      .find(c => c.name === 'logs')
      .send(`${message.author} posted a link that was deleted by ${client.user.username}. They've been warned via DM.`)
      .catch(console.error)
  }

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(prefix.length).split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }
  else {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
    command.execute(message, args, client);
  }
  catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);