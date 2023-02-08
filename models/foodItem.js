const mongoose = require('mongoose');

const FoodItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must provide a name'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Must provide a price'],
  },
  company: {
    type: String,
    enum: {
      values: [
        'k1-go!',
        'lemercy',
        'thehouse',
        'chesspizza',
        'thecapital',
        'marianacafe',
        'mrchicken',
      ],
      message: '{VALUE} is not supported',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
