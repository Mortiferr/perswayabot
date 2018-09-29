const dotenv = require('dotenv').config();
const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');
const mongoose = require('mongoose');
const playerBase = require('./db/player')
const ObjectID = require('mongodb').ObjectID;

let prefix = config.prefix;

let dev_db_url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds123971.mlab.com:23971/playerbase`
let mongodb = mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback) {
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
  console.log(`${client.user.username} loaded successfully.`);
  client.user.setPresence({ game: { name: 'with you' }, status: 'online' })
    .catch(console.error);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
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
  
  // const shortLinks = ["goo.gl", "shorte.st", "adf.ly", "bc.vc", "bit.ly", "bit.do", "soo.gd", "7.ly", "5.gp", "tiny.cc", "ouo.io", "zzb.bz", "adfoc.us", "my.su"]
  // const swearWords = ["faggot", "gini", "kike", "n1gga", "n1gger", "nigg3r", "nigga", "nigger", "retard", "niqqa", "n1qqa", "niqqer", "n1qqer",]

  // if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
  //   message.delete();
  //   message.author.send(`Hey, please don't use that word in Perswayable's Discord. Thanks.`);
  //   client.channels
  //     .find(c => c.name === 'logs')
  //     .send(`${message.author} posted a racist / sexist / disablist slur that was deleted by ${client.user.username}. They've been warned via DM.`)
  //     .catch(console.error)
  // }

  // if (shortLinks.some(word => message.content.includes(word))) {
  //   message.delete();
  //   message.author.send(`Hey, please don't send short links in Perswayable's Discord. You can post the link, just send the full length one. Thanks :)`);
  //   client.channels
  //     .find(c => c.name === 'logs')
  //     .send(`${message.author} posted a link that was deleted by ${client.user.username}. They've been warned via DM.`)
  //     .catch(console.error)
  // }

  // if (command === 'tourney') {
  //   let team = args[0];
  //   let id = args[1];
  //   let ign = args[2];

  //   if (team == undefined && id == undefined && ign == undefined) {
  //     message.reply(
  //       `You can choose **hunter**, **survivor**, or **flex** teams. Flex means you could be either depending on where you're needed.\nYour type this into the chat to sign up, **replacing the ALL CAPS words with your own information.**\n\`!tourney YOURTEAM YOURID YOURIGN\`\n\nFor example: \`!tourney flex 1234567 XxJohnCenaxX\`\n\nIf you need any help, feel free to ask and one of our helpful staff members will assist you!`
  //     )
  //     return;
  //   }
  //   if (team == undefined || id == undefined || ign == undefined) {
  //     message.reply(
  //       `Whoops! You forgot something. Your command should be like this: \`\``
  //     )
  //     return;
  //   }
  //   let newPlayer = new Player({
  //     team: team,
  //     ign: ign,
  //     id: id,
  //     __id: new ObjectID()
  //   })

  //   db.collection('playerBase').insertOne(newPlayer);

  //   message.reply(
  //     `Tourney test:\nID: ${id}\nIGN: ${ign}`
  //   )
  // }
  // if (command === 'info') {
  //   let subSection = args[0];
  //   if (subSection == undefined) {
      
  //   }
  // }
});

client.login(process.env.TOKEN);