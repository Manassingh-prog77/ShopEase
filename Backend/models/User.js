const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  address: {
    type: String,  
    default: 'Add address to complete Profile'    
  },
  membership:{
    type: String,
    default: 'Gold Member'
  },
  phone: {
    type: String,
    default: 'Add Phone Number'
  }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
