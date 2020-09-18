const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdopPostSchema = new Schema({
  name: {
    type: String
  },
  picture: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  petName: {
    type: String
  },
  picture: {
    type: String
  },
  avatar: {
    type: String
  },
  race: { 
    type: String,
    // required: true 
  },
  species:{
    type: String,
    required: true 
  },
  sexe: { 
    type: String, 
    required: true 
  },
  dateBirth: {
    type: String 
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = AdopPost = mongoose.model('adop_post', AdopPostSchema);