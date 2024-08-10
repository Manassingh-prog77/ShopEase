const mongoose = require('mongoose');
const { Schema } = mongoose;

const BuySchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  orderId: {
    type: String,
    unique: true,
    required: true,
    default: function() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = String(now.getFullYear()).slice(2); // Last two digits of the year
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      return `${day}${month}${year}${hours}${minutes}${seconds}`;
    }
  },
  asin: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  totalBill: {
    type: Number,
    required: true
  },
  OrderStatus:{
    type: String,
    default: "To be delivered"
  },
  image:{
    type: String,
  }
}, {
  timestamps: true
}
);

const Buy = mongoose.model('order', BuySchema);
module.exports = Buy;
