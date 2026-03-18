import products from "../model/productModel.js"
import customError from "../utils/Error.js";
import logger from "../lib/logger.js";


export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await products.create(req.body);
        logger.info("Product created successfully");
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            return res.redirect('/pages/products');
        }
        res.status(201).json({ 
            success: true,
             data: newProduct }
            );
    } catch (error) {
        logger.error("Error creating product:", error);
        next(new customError("Failed to create product", 500));
    }
};

export const GetAllProducts = async ( req , res , next)=>{

    try {
        const { catagory , minPrice , maxPrice } = req.query;
        let filter = {};

        if (catagory) {
            filter.catagory = catagory;
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = parseFloat(minPrice);
            }
            if (maxPrice) {
                filter.price.$lte = parseFloat(maxPrice);
            }
        }
        const allproducts = await products.find(filter);
        logger.info("Products retrieved successfully");
        res.status(200).json({ 
            success: true, 
            data: allproducts
         });
    } catch (error) {
        logger.error("Error retrieving products:", error);
        next(new customError("Failed to retrieve products", 500));
    }   
};

export const GetProductById = async ( req , res , next ) => {
    try {
        const product = await products.findById(req.params.id);
        if (!product) {
            logger.warn("Product not found with ID: " + req.params.id);
            return next(new customError("Product not found", 404));
        }
        logger.info("Product retrieved successfully with ID: " + req.params.id);
        res.status(200).json({
             success: true, 
             data: product 
            });
    } catch (error) {
        logger.error("Error retrieving product by ID:", error);
        next(new customError("Failed to retrieve product", 500));
    }
};

export const UpdateProduct = async ( req , res , next ) => {
    try {
        const product = await products.findByIdAndUpdate(req.params.id, req.body, { 
                new: true,
                 runValidators: true 
                });
        if (!product) {
            logger.warn("Product not found for update with ID: " + req.params.id);
            return next(new customError("Product not found", 404));
        }
        logger.info("Product updated successfully with ID: " + req.params.id);
        res.status(200).json({ 
            success: true, 
            data: product 
        });
    } catch (error) {
        logger.error("Error updating product:", error);
        next(new customError("Failed to update product", 500));
    }
};

export const DeleteProduct = async ( req , res , next ) => {
    try {
        const product = await products.findByIdAndDelete(req.params.id);
        if (!product) {
            logger.warn("Product not found for deletion with ID: " + req.params.id);
            return next(new customError("Product not found", 404));
        }
        logger.info("Product deleted successfully with ID: " + req.params.id);
        res.status(204).json({ 
            success: true, 
            data: null,
            message: "Product deleted successfully" 
        });
    } catch (error) {
        logger.error("Error deleting product:", error);
        next(new customError("Failed to delete product", 500));
    } 
};