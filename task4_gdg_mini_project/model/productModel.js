import mongoose from "mongoose";

const prductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min : 0,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  imageurl : {
    type: String,
    required: true,
  }} , { timestamps: true });

const products = mongoose.model("products", prductSchema);

export default products;