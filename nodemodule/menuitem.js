const mongoose = require('mongoose');

// Define the schema for a menu item
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'], // Custom error message
    trim: true, // Removes leading and trailing whitespace
  },
  price: {
    type: Number,
    required: [true, 'Price is required'], // Custom error message
    min: [0, 'Price must be a positive number'], // Ensure non-negative prices
  },
  taste: {
    type: String,
    enum: {
      values: ['sweet', 'spicy', 'sour'], // Allowed taste values
      message: 'Taste must be either sweet, spicy, or sour', // Custom error message
    },
    required: [true, 'Taste is required'],
  },
  is_drink: {
    type: Boolean,
    default: false, // Default value if not provided
  },
  ingredients: {
    type: [String], // Array of strings for ingredients
    default: [], // Default to an empty array
  },
  num_sales: {
    type: Number,
    default: 0, // Default value if not provided
    min: [0, 'Number of sales cannot be negative'], // Ensure non-negative sales
  },
});

// Create a model from the schema
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
