module.exports = {
  name: 'tourney',
  description: 'Joins the tournament.',
  args: true,
  cooldown: 1,
  execute(message, args, client) {
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
}