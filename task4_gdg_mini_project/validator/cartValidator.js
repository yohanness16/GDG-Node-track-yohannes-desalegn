import Joi from "joi";

export const cartAddItemSchema = Joi.object({
    productId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
});

export const cartUpdateSchema = Joi.object({
    productId: Joi.string().hex().length(24),
    quantity: Joi.number().integer().min(1),
}).min(1);