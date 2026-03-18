import logger from "../lib/logger.js";

const validateRequest = (schema) =>  (req, res, next) => {
        const { error } = schema.validate(req.body , { abortEarly: false });
        if (error) {
            logger.error("Validation error:", error.details[0].message);
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };


export default validateRequest;