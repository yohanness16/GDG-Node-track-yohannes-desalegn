import Joi from 'joi';

const bookSchema = Joi.object({
  title: Joi.string().min(5).required(),
  author: Joi.string().min(3).required(),
  price: Joi.number().positive().required()
})

export default bookSchema;