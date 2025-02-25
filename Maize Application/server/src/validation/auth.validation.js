import Joi from "joi";
export const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})


// Define Joi validation schema
export const registerSchema = Joi.object({
  fullName: Joi.string()
    .trim(false) // Allows strings with spaces
    .required()
    .messages({
      "string.empty": "Full name is required",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/) // Accepts only numeric strings between 10-15 digits
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10-15 digits long",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),

  password: Joi.string()
    .min(8) // Password must be at least 8 characters
    .required()
    .trim()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
    }),

  homeAddress: Joi.string()
    .required()
    .messages({
      "string.empty": "Home address is required",
    }),

  amountInvested: Joi.number()
    .min(0)
    .default(0)
    .messages({
      "number.min": "Amount invested must be at least 0",
    }),

  equityIssued: Joi.number()
    .min(0)
    .default(0)
    .messages({
      "number.min": "Equity issued must be at least 0",
    }),

  investmentType: Joi.string()
    .valid("Early stage", "Seed", "Pre-seed", "Revenue split 12-Month")
    .required()
    .messages({
      "any.only": `Investment type must be one of: Early stage, Seed, Pre-seed, Revenue split 12-Month`,
      "string.empty": "Investment type is required",
    }),

  investmentDate: Joi.date()
    .default(() => new Date())
    .messages({
      "date.base": "Investment date must be a valid date",
    }),

  role: Joi.string()
    .valid("USER", "ADMIN")
    .default("USER")
    .messages({
      "any.only": `Role must be one of: USER, ADMIN`,
    }),
});
