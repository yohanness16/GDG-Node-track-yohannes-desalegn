import express from "express";
import { getProductsPage, getCartPage, getOrdersPage , getAddProductPage } from "../controller/viewController.js";

const router = express.Router();

router.get("/products", getProductsPage);
router.get("/cart", getCartPage);
router.get("/orders", getOrdersPage);
router.get("/add-product", getAddProductPage);

export default router;