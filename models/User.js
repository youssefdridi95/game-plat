const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: Number,
  },
  type:{
    type:String,
    // required:true,
    default:"user"
  },
  adress:{
    type:String,
    required:true
  }
});

module.exports = User = mongoose.model('user', UserSchema);