import mongoose from "mongoose";

export const Book = mongoose.model('Book', new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    qty: Number,
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})); 