const mongoose = require('mongoose');

const breadSchema = new mongoose.Schema({
  bread_id: mongoose.Schema.Types.ObjectId,
  name: String,
  address: String,
  phone: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  business_hours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  menu: [{
    name: String,
    price: Number
  }]
});

const Bread = mongoose.model('Bread', breadSchema);

module.exports = Bread;
