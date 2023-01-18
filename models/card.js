import mongoose from "mongoose";
import user from "./user";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  ling: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{
    //hz kak delat`
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default new mongoose.Model('card', cardSchema);