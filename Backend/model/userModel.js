import mongoose from "mongoose";

export const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    }
}));