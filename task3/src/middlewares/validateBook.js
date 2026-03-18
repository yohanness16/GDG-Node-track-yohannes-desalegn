import bookSchema from '../utils/validationSchema.js';

export const validateBook = (req, res, next) => {
  const { error, value } = bookSchema.validate(req.body);

  if(error){
    return res.status(400).json({
      message: 'Validation Error',
      error: error.details[0].message
    })
  }

  req.validatedBody = value;
  next();
}