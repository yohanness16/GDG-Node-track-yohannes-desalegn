import mongoose from "mongoose";

const cartItems = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        min : 1,
    }
});

const cartSchema = new mongoose.Schema({
    items : [cartItems],
    totalPrice : {
        type: Number,
        required: true,
        default : 0,
    }} , { timestamps: true });



const carts = mongoose.model("carts", cartSchema);

export default carts;