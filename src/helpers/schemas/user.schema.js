import Joi from 'joi';
const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'string.empty': "Email can't be empty",
        'any.required': 'Email is required',
    }),
    name: Joi.string().min(8).max(32).required().messages({
        'string.min': 'Name must be at least 8 characters',
        'string.max': "Name can't be longer than 32 characters",
        'string.empty': "Name can't be empty",
        'any.required': 'Name is required',
    }),
    phone: Joi.string().min(11).max(11).regex(/(?=[01])[\d]{10,11}/).required().messages({
        'string.min': 'Phone must be at least 11 characters',
        'string.max': "Phone can't be longer than 11 characters",
        'string.empty': "Phone can't be empty",
        'any.required': 'Phone is required',
        'user.string.pattern.base': 'Phone must be a valid phone number',
    }),
});
export default userSchema;