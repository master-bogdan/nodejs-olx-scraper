const { Schema, model } = require('mongoose');

const schema = new Schema({
  _id: Number,
  link: String,
  title: String,
  location: String,
  date: String,
  price: String,
}, { _id: false });

module.exports = model('Add', schema);
