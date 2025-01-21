const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  work: {
    type: String,
    required: false
  },
  mobile: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  salary: {
    type: Number,
    required: false
  }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
