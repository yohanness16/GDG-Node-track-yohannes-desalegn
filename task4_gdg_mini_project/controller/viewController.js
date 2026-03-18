import products from "../model/productModel.js";
import carts from "../model/cartModel.js";
import Order from "../model/orderModel.js";

export const getProductsPage = async (req, res) => {
    try {
        const allProducts = await products.find();
        res.render('products', { data: allProducts });
    } catch (error) {
        res.status(500).send("Error loading products");
    }
};

export const getCartPage = async (req, res) => {
    try {
        const cart = await carts.findOne().populate("items.productId").sort({ createdAt: -1 });
        res.render('cart', { data: cart });
    } catch (error) {
        res.status(500).send("Error loading cart");
    }
};

export const getOrdersPage = async (req, res) => {
    try {
        const allOrders = await Order.find().sort("-createdAt");
        res.render('orders', { data: allOrders });
    } catch (error) {
        res.status(500).send("Error loading orders");
    }
};

export const getAddProductPage = (req, res) => {
    
    res.render('add-product');
};