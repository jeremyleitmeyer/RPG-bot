const mongoose = require('mongoose')
const Player = require('./models/Player')
const Item = require('./models/Item')
const self = require('./shop.js')
const auth = require('./auth.json')

exports.admin_add = function (bot, channelID, userID, itemName, itemPrice) {
  if (userID === auth.ADMIN || userID === auth.ADMIN2) {
    if (itemName === undefined || itemPrice === undefined) {
      bot.sendMessage({
        to: channelID,
        message: '```You must do !admin_add <item name> <item price>```'
      })
    } else {
      var newItem = new Item({
        name: itemName,
        price: itemPrice
      }).save()
      bot.sendMessage({
        to: channelID,
        message: '```Item added !```'
      })
    }
  } else {
    bot.sendMessage({
      to: channelID,
      message: '```You do not have that permission```'
    })
  }
}

exports.showShop = function (bot, channelID, userID, itemName, itemPrice) {
  currentShop = Item.find({}, function (err, items) {
    var shop = {}
    var shopMsg = ['nothing']
    items.forEach(function (item) {
      shop[item._id] = item
      if (shopMsg[0] === 'nothing') {
        shopMsg = []
        shopMsg.push(item.name + ': ' + item.price + ' \n')
      } else {
        shopMsg.push(item.name + ': ' + item.price + ' \n')
      }
    })
    bot.sendMessage({
      to: channelID,
      message: '```' + shopMsg.join('\n') + '```'
    })
  })
}

exports.buy = function () {
  // todo
  // points math
  // update items and users
}

// exports.points = function (bot, evt, channelID, userID) {
//   var currentPlayer = Player.findOne({
//     playerId: userID
//   }, function (err, player) {
//     if (player === null) {
//       self.new(bot, evt, channelID, userID)
//     } else {
//       if (player.playerId === userID) {
//         bot.sendMessage({
//           to: channelID,
//           message: '```' + player.name + ' has ' + player.points + ' points!' + '```'
//         })
//       }
//     }
//   })
// }

// exports.addOne = function (userID) {
//   var currentPlayer = Player.findOne({
//     playerId: userID
//   }).update({
//     $inc: {
//       points: 1
//     }
//   }, function (err, doc) {
//     // console.log(err)
//   })
// }

// exports.addTwo = function (userID) {
//   var currentPlayer = Player.findOne({
//     playerId: userID
//   }).update({
//     $inc: {
//       points: 2
//     }
//   }, function (err, doc) {
//     console.log(err)
//   })
// }

// exports.addThree = function (userID) {
//   var currentPlayer = Player.findOne({
//     playerId: userID
//   }).update({
//     $inc: {
//       points: 3
//     }
//   }, function (err, doc) {
//     console.log(err)
//   })
// }

// exports.addSome = function (userID, some) {
//   var currentPlayer = Player.findOne({
//     playerId: userID
//   }).update({
//     $inc: {
//       points: some
//     }
//   }, function (err, doc) {
//     // console.log(err)
//   })
// }
