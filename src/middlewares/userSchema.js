import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
    confirmar: Joi.string().required().valid(Joi.ref('senha'))
});

const transactionSchema = Joi.object({
    isIncoming: Joi.boolean().required(),
    amount: Joi.number().required(),
    title: Joi.string().min(3).max(20).required()
})

export {signUpSchema, transactionSchema};