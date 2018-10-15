module.exports = {
  name: 'announce',
  description: 'Has the bot announce whatever you input.',
  args: true,
  cooldown: 1,
  execute(message, args, client) {
    message.delete();
    message.channel.send(`${args.join(" ")}`);
  }
};