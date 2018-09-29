module.exports = {
  name: 'custom',
  description: 'Joins the queue to play a custom game with Perswayable.',
  args: true,
  cooldown: 10,
  execute(message, args, client) {
    let team = args[0];
    let id = args[1];
    let ign = args[2];
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
}