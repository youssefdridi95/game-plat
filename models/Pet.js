const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  dateBirth: {
    type: Date
  },
  date:{
      type:Date,
      default:Date.now
  },
  sex:{
    type:String
  },
  species:{
    type:String,
    required:true
  },
  race:{
    type:String,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = Pet = mongoose.model('pet', PetSchema);
