import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
    imageurl : Joi.string().uri().required(),
});

export const productUpdateSchema = Joi.object({
    name: Joi.string().trim().min(3).max(30),
    description: Joi.string().min(10),
    price: Joi.number().min(0),
    category: Joi.string(),
    stock: Joi.number().integer().min(0),
    imageurl : Joi.string().uri(),
}).min(1);