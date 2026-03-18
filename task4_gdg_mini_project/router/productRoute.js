import express from "express";
import { createProduct, DeleteProduct, GetAllProducts, GetProductById, UpdateProduct } from "../controller/productController.js";
import validateRequest from "../middleware/validator.js";
import { productSchema, productUpdateSchema } from "../validator/productValidator.js";

const router = express.Router();

router.post("/", validateRequest(productSchema), createProduct);
router.get("/", GetAllProducts);
router.get("/:id", GetProductById);
router.put("/:id", validateRequest(productUpdateSchema), UpdateProduct);
router.delete("/:id", DeleteProduct);

export default router;