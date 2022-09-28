import Joi from 'joi';
const orderSchema = Joi.object({
    userId: Joi.number().required().messages({
        'number.base': 'User must be a number',
        'any.required': 'User is required',
    }),
    products: Joi.array().items(Joi.object({
        productId: Joi.number().required().messages({
            'number.base': 'Product must be a number',
            'any.required': 'Product is required',
        }),
        quantity: Joi.number().greater(0).required().messages({
            'number.base': 'Quantity must be a number',
            'number.greater': 'Quantity must be greater than 0',
            'any.required': 'Quantity is required',
        }),
    })).required().messages({
        'array.base': 'Products must be an array',
        'any.required': 'Products is required',
    }),
});
export default orderSchema;