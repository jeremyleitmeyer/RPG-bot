exports.help = function (bot, channelID) {
  bot.sendMessage({
    to: channelID,
    message: '```!shop'+
    '\n\n!play sets the Playing status(admin only) !admin_add <item name> <item price>```'
  })
}

exports.play = function (bot, activity, userID, channelID) {
  if (userID === process.env.ADMIN) {
    // temp fix
    bot.setPresence({
      game: {
        name: activity
      }
    })
  } else {
    bot.sendMessage({
      to: channelID,
      message: '```You do not have that permission```'
    })
  }
}
