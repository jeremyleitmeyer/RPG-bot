const mongoose = require('mongoose')
const {Schema} = mongoose

const itemSchema = new Schema({
  name: String,
  price: Number
})

module.exports = mongoose.model('items', itemSchema)
