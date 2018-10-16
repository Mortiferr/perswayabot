const mongoose = require('mongoose');
const playerBase = require('../db/player')
const ObjectID = require('mongodb').ObjectID;
let Player = mongoose.model('Player');
let mongodb = mongoDB = process.env.MONGODB_URI

let db = mongoose.connection;

exports.run = (client, message, args, level) => {
  let role = message.guild.roles.find(r => r.name === 'Tournament Entry Ticket');
  let member = message.member;
  // Checks if they have the role, and if they do, stop exit early.
  if (message.member.roles.has(role.id)) {
    message.reply(`Sorry! You've already entered the tournament! You can lookup your entry by doing \`!lookup\`.`)
    return
  }

  let team = args[0];
  let id = args[1];
  let ign = args[2];

  if (team == undefined && id == undefined && ign == undefined) {
    message.reply(
      `You can choose **hunter**, **survivor**, or **flex** teams. Flex means you could be either depending on where you're needed.\nYou can type this into the chat to sign up, **replacing the ALL CAPS words with your own information.**\n\`!tourney YOURTEAM YOURID YOURIGN\`\n\nFor example: \`!tourney flex 1234567 XxJohnCenaxX\`\n\nIf you need any help, feel free to ask and one of our helpful staff members will assist you!`
    )
    return;
  }
  if (team == undefined || id == undefined || ign == undefined) {
    message.reply(
      `Whoops! You forgot something. Your command should be like this: \`!tourney YOURTEAM YOURID YOURIGN\`. Type \`!info tourney\` for more information.`
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
    `You entered the tournament as a ${team}!\nIGN: ${ign}\nID: ${id}`
  )
  member.addRole(role)
    .catch(console.error);
  client.channels
    .find(c => c.name === 'tournament')
    .send(`${message.author} entered the tournament as a ${team}! IGN: ${ign} ID: ${id}`)
    .catch(console.error)
  return;
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tournament"],
  permLevel: 'User'
};

exports.help = {
  name: 'tourney',
  category: 'Tournament',
  description: 'Joins the tournament.',
  usage: 'tourney [hunter/survivor/flex] [id] [ign] (without brackets)'
}