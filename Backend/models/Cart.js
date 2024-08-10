const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  asin:{
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  }, 
  price:{
    type: Number,
    required: true
  },
  image:{
    type: String,
  }
});
const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;



