import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    items : [{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        name : {
            type: String,
            required: true,
        },
        price : {
            type: Number,
            required: true,
            min : 0,
        },
        quantity:{
            type: Number,
            required: true,
            min : 1,
        }
    }] ,
    totalPrice : {
        type: Number,
        required: true,
        min : 0,
    },
    customerInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true }
    },
    status : {
        type: String,
        enum : ["pending", "completed", "cancelled"],
        default : "pending",
    }} , { timestamps: true });

const Order = mongoose.model("orders", orderSchema);

export default Order;