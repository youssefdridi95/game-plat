const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetShopPostsSchema = new Schema({
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
  petName: { type: String },
  price: { type: Number, required: true },
  picture: { type: String },
  race: { type: String},
  species:{
    type: String,
    required: true 
  },
  sexe: { type: String, required: true },
  dateBirth: { type: String },
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

module.exports = PetShopPosts = mongoose.model('sellpetpost', PetShopPostsSchema);
