const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
let db = mongoose.connection;

exports.run = (client, message, args, level) => {

  const Warning = mongoose.model('Warning', {
    user: String,
    mod: String,
    reason: String,
  });

  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let reason = message.content.split(' ').slice(2).join(' ');
  let mod = message.author;

  const warnings = new Warning({
    user: user,
    mod: mod,
    reason: reason,
    __id: new ObjectID()
  });


  db.collection('warnings').insertOne(warnings, (err, res) => {
    client.logger.log(`Inserted the warning in the db.`, 'debug');
  });

  // let cursor = db.collection('warnings').find();
  // cursor.forEach((doc, err) => {
  //   resultArray.push(doc);
  // });

  warnings
    .save()
    .then(() => client.logger.log(`${mod} warned ${user} for "${reason}".`, "debug"));

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'warn',
  category: 'In Development',
  description: 'in progress',
  usage: 'warn [@user] [reason] (without brackets)'
}