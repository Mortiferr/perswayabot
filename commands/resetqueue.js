module.exports = {
  name: 'resetqueue',
  description: 'Admin only. Resets the custom match w/ Persway queue.',
  execute(message, client) {
    if (!message.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply(`That ain't it, chief.`);
    let role = message.guild.roles.find(`name`, `Queued`);
    role.delete()
      .catch(console.error);
    message.guild.createRole({
      name: `Queued`,
      color: 0x00b894
    })
      .catch(console.error)
    message.reply(`Queue has been reset.`)
  },
};