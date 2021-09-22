const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 20,
  },
  coin: {
    type: String,
    required: true,
    maxlength: 10
  },
  priceUp: {
    type: Number,
    required: false
  },
  priceDown: {
    type: Number,
    required: false
  }
})


module.exports = mongoose.model('Contact', ContactSchema)