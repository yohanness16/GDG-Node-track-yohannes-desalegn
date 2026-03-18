import carts from "../model/cartModel.js";
import products from "../model/productModel.js";
import customError from "../utils/Error.js";
import logger from "../lib/logger.js";


export const createNewCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        let cartId = req.session.cartId;
        let cart;

      
        if (cartId) {
            cart = await carts.findById(cartId);
        }

        
        if (!cart) {
            cart = await carts.create({ items: [], totalPrice: 0 });
            req.session.cartId = cart._id; 
            logger.info("New session cart created: " + cart._id);
        }

       
        if (productId) {
            const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (existingItemIndex >= 0) {
                cart.items[existingItemIndex].quantity += Number(quantity) || 1;
            } else {
                cart.items.push({ productId, quantity: Number(quantity) || 1 });
            }

            await cart.populate("items.productId");
            cart.totalPrice = cart.items.reduce((total, item) => {
                const price = item.productId ? item.productId.price : 0;
                return total + (price * item.quantity);
            }, 0);
            await cart.save();
        }

       
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            return res.redirect('/pages/products'); 
        }

        res.status(201).json({ success: true, data: cart });
    } catch (error) {
        logger.error("Create cart error:", error);
        next(new customError("Failed to process cart", 500));
    }
};

export const addItemToSpecificCart = async (req, res, next) => {
    try {
        const { cartId } = req.params; 
        const { productId, quantity } = req.body;

        const product = await products.findById(productId);
        if (!product) return next(new customError("Product not found", 404));

        let cart = await carts.findById(cartId);
        if (!cart) return next(new customError("Cart not found", 404));

        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += Number(quantity);
        } else {
            cart.items.push({ productId, quantity: Number(quantity) });
        }

        await cart.populate("items.productId");
        cart.totalPrice = cart.items.reduce((total, item) => {
            const price = item.productId ? item.productId.price : 0;
            return total + (price * item.quantity);
        }, 0);

        await cart.save();

        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                 return res.redirect('/pages/products'); 
        }       
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        logger.error("Add to cart error:", error);
        next(new customError("Failed to add item to cart", 500));
    }
};

export const getCart = async (req, res, next) => {
    try {
        
        const cartId = req.session.cartId;
        const cart = cartId 
            ? await carts.findById(cartId).populate("items.productId")
            : await carts.findOne().populate("items.productId");

        if (!cart) {
            logger.warn("Cart not found");
            return next(new customError("Cart not found", 404));
        }
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        next(new customError("Failed to retrieve cart", 500));
    }
};

export const updateQuantity = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params; 
        const { quantity } = req.body;

        let cart = await carts.findById(cartId);
        if (!cart) return next(new customError("Cart not found", 404));

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) return next(new customError("Product not found in cart", 404));

        cart.items[itemIndex].quantity = Number(quantity);
        
        await cart.populate("items.productId");
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (item.productId.price * item.quantity);
        }, 0);

        await cart.save();

        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            return res.redirect('/pages/cart'); 
        }
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        next(new customError("Failed to update cart", 500));
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params; 
        const cart = await carts.findById(cartId);
        if (!cart) return next(new customError("Cart not found", 404));

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.populate("items.productId");
        cart.totalPrice = cart.items.reduce((total, item) => {
            const price = item.productId ? item.productId.price : 0;
            return total + (price * item.quantity);
        }, 0);

        await cart.save();
        
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            return res.redirect('/pages/cart'); 
        }
        res.status(200).json({ success: true, message: "Item removed", data: cart });
    } catch (error) {
        next(new customError("Failed to remove product", 500));
    }
};