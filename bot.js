const Discord = require('discord.io')
const logger = require('winston')
const bodyParser = require('body-parser')
const auth = require('./auth.json')
const mongoose = require('mongoose')


require('./models/Player')
require('./models/Item')

mongoose.connect(auth.DB_TOKEN, {
  useMongoClient: true
})

// global
var msg, re_weburl

// default Playing text
var activity = 'with elf girls'

// logger settings
logger.remove(logger.transports.Console)

logger.add(logger.transports.Console, {
  colorize: true
})

logger.level = 'debug'

var bot = new Discord.Client({
  token: auth.BOT_TOKEN,
  autorun: true
})

bot.on('ready', function (evt) {
  logger.info('Connected')
  logger.info('Logged in as: ')
  logger.info(bot.username + ' - (' + bot.id + ')')
  bot.setPresence({
    game: {
      name: activity
    }
  })
})

// import command files
const command = require('./command.js')
const points = require('./points.js')
const shop = require('./shop.js')

bot.on('message', function (user, userID, channelID, message, evt) {
  // point per word
  if (message.substring(0, 1) != '!') {
    var some = message.substring(1).split(' ').length
    points.addSome(userID, some)
  }

  // will listen for messages that will start with `!`
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ')
    var cmd = args[0]
    var tag = args[1]
    // for playing command, gets whole message after !play
    var playText = []
    // repetition for clarity
    var itemName = args[1]
    var itemPrice = args[2]
    for (i = 1; i < args.length; i++) {
      playText.push(args[i])
    }

    args = args.splice(1)
    switch (cmd) {
      // commands
      case 'find':
        command.find(bot, channelID, tag)
        break
      case 'help':
        command.help(bot, channelID)
        break
      case 'rpgPlay':
        activity = playText.join(' ')
        command.play(bot, activity, userID, channelID)
        break
      // **************************************
      case 'admin_add':
        shop.admin_add(bot, channelID, userID, itemName, itemPrice)
        break
      case 'shop':
        shop.showShop(bot, channelID, userID, itemName, itemPrice)
        break
      case 'points':
        points.points(bot, evt, channelID, userID)
        break
    }
  }
})
