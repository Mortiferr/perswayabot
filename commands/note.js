const Discord = require('discord.js');
const db = require('quick.db');
const send = require('quick.hook')

exports.run = async (client, message, args, level) => {
  const logs = message.guild.channels.find(c => c.name === ('logs'));
  const mod = message.author;
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if (!user) return send(message.channel, 'You need to supply a user to add the note to.', {
    name: 'Notes System',
    icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/denied-512.png'
  });

  if (user.hasPermission('BAN_MEMBERS')) return send(message.channel, 'Yeah, that\'s a moderator.', {
    name: 'Notes System',
    icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/denied-512.png'
  });

  let note = message.content.split(' ').slice(2).join(' ');

  if (!note) return send(message.channel, 'You must supply a note.', {
    name: 'Notes System',
    icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/denied-512.png'
  });

  const noteId = new db.table('NOTEID');
  const guildNoteId = await noteId.fetch(`case_${message.guild.id}`)
  const a = guildNoteId;
  const b = a + 1;

  noteId.set(`case_${message.guild.id}`, b);

  const numberNote = new db.table('NOTENUMBERs');
  const num1 = await numberNote.fetch(`user_${user.id}_${message.guild.id}`);
  const y = 1;
  const m = y + num1;
  numberNote.set(`user_${user.id}_${message.guild.id}`, m);

  if (user) {
    const userNote = new db.table('USERNOTEs');
    const num2 = await numberNote.fetch(`user_${user.id}_${message.guild.id}`);
    const notes = await userNote.fetch(`note_${user.id}_${num2}_${message.guild.id}`);
    userNote.set(`note_${user.id}_${num2}_${message.guild.id}`, note);
    const embed = new Discord.RichEmbed()
      .setAuthor('Notes')
      .addField('Moderator', `${mod}`)
      .addField('User', `<@${user.id}>`)

      .addField('Note', `${note}`)
      .addField('Note Number', `${guildNoteId}`)
      .setColor('BLUE')
      .setTimestamp()
      .setFooter(`ID ${user.id}`)

    send(logs, embed, {
      name: 'Notes System',
      icon: `https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png`
    });

    send(message.channel, 'I have added the note.', {
      name: `Notes System`,
      icon: `https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png`
    })
  }

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'note',
  category: 'Moderatation',
  description: 'Add a private, moderator-only note to a user\'s account.',
  usage: 'note [@user] [note] (without brackets)'
}