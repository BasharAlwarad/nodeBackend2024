import Joi from 'joi';

export const createUserSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name should have at least 2 characters',
    'string.max': 'First name should have at most 50 characters',
  }),
  last_name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name should have at least 2 characters',
    'string.max': 'Last name should have at most 50 characters',
  }),
  age: Joi.number().integer().min(0).required().messages({
    'number.base': 'Age must be a number',
    'number.min': 'Age must be a positive integer',
  }),
});
