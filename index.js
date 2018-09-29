const dotenv = require('dotenv').config();
const config = require('./config.json');
const Discord = require('discord.js');
const mongoose = require('mongoose');
const playerBase = require('./db/player')
const ObjectID = require('mongodb').ObjectID;

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

client.on('ready', async () => {
  console.log(`${client.user.username} loaded successfully.`);
  client.user.setPresence({ game: { name: 'with you' }, status: 'online' })
    .catch(console.error);
});

client.on('message', message => {
  if (message.author.bot) return;
  
  const shortLinks = ["goo.gl", "shorte.st", "adf.ly", "bc.vc", "bit.ly", "bit.do", "soo.gd", "7.ly", "5.gp", "tiny.cc", "ouo.io", "zzb.bz", "adfoc.us", "my.su"]
  const swearWords = ["faggot", "gini", "kike", "n1gga", "n1gger", "nigg3r", "nigga", "nigger", "retard", "niqqa", "n1qqa", "niqqer", "n1qqer",]

  if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
    message.delete();
    message.author.send(`Hey, please don't use that word in Perswayable's Discord. Thanks.`);
    client.channels
      .find(c => c.name === 'logs')
      .send(`${message.author} posted a racist / sexist / disablist slur that was deleted by ${client.user.username}. They've been warned via DM.`)
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

  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();   

  if (command === 'custom') {
    let team = args[0];
    let id   = args[1];
    let ign  = args[2];
    if (ign == undefined || id == undefined || team == undefined) {
      message.reply(
        `Uh oh! Looks like you forgot a parameter. Check your command and try again. Remember you need to specify a *TEAM*, *ID*, and *IGN*.\nThat looks like this: \`!custom CHOOSEATEAM YOURID YOURIGN\``
      )
      client.channels
      .find(c => c.name === 'logs')
      .send(`${message.author} tried so hard and got so far. But in the end, they can't type. Help them **join custom as a _${team}_**.`)
      .catch(console.error)
      return;
    }
    if (team == 'hunter' || team == 'survivor') {
      let role = message.guild.roles.get(process.env.QED);
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
            .get(process.env.HUNTER)
            .send(`${message.author} - ${id} - ${ign}`);
          member.addRole(role).catch(console.error);
        }
      }

      else if (team === 'survivor') {
        let role = message.guild.roles.get(process.env.QED);
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
            .get(process.env.SURVIVOR)
            .send(`${message.author} - ${id} - ${ign}`);
          member.addRole(role).catch(console.error);
        }
      }
    }
    else {
      message.reply(
        `Your team selection should either be **hunter** OR **survivor**. You entered \`${team}\``
      )
      return;
    }
  }
  if (command === 'help') {
    let whichCommand = args[0];
    let whichSubCommand = args[1];
    if (whichCommand === 'custom' && whichSubCommand === 'hunter') {
        message.reply(`Copy this and fill in your information: \`!custom hunter 1234566 yourign\``);
    }
    if (whichCommand === 'custom' && whichSubCommand === 'survivor') {
      message.reply(`Copy this and fill in your information: \`!custom survivor 1234566 yourign\``);
    }
  }
  if (command === 'tourney') {
    let team = args[0];
    let id = args[1];
    let ign = args[2];

    if (team == undefined && id == undefined && ign == undefined) {
      message.reply(
        `You can choose **hunter**, **survivor**, or **flex** teams. Flex means you could be either depending on where you're needed.\nYour type this into the chat to sign up, **replacing the ALL CAPS words with your own information.**\n\`!tourney YOURTEAM YOURID YOURIGN\`\n\nFor example: \`!tourney flex 1234567 XxJohnCenaxX\`\n\nIf you need any help, feel free to ask and one of our helpful staff members will assist you!`
      )
      return;
    }
    if (team == undefined || id == undefined || ign == undefined) {
      message.reply(
        `Whoops! You forgot something. Your command should be like this: \`\``
      )
      return;
    }
    let newPlayer = new Player({
      team: team,
      ign: ign,
      id: id,
      __id: new ObjectID()
    })

    db.collection('playerBase').insertOne(newPlayer);

    message.reply(
      `Tourney test:\nID: ${id}\nIGN: ${ign}`
    )
  }
  if (command === 'info') {
    let subSection = args[0];
    
  }
});

client.login(process.env.TOKEN);