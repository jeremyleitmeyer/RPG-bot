const mongoose = require('mongoose')
const {Schema} = mongoose

const playerSchema = new Schema({
  name: String,
  playerId: String,
  points: Number,
  inventory: Array
})

module.exports = mongoose.model('players', playerSchema)
