// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Grab the settings for this server from Enmap.
  // If there is no guild, get default conf (DMs)
  const settings = message.settings = client.getGuildSettings(message.guild);

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

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in the Perswayable Discord.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args, level);
};
