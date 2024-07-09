import Joi from "joi";

export const userValidator = Joi.object({
    username: Joi.string().max(32).required().error(() => new Error("Username is required !")),
    password: Joi.string().max(20).required().error(() => new Error("Password is required !"))
});

let todo_body = Joi.string().max(32).required().error(() => new Error("Todo body is required !"))
let isImportant = Joi.boolean().error(() => new Error("Todo is important is required !"))
let user_id = Joi.number().error(() => new Error("Todo user id is required !"))
export const todoValidator = Joi.object({
    todo_body,
    isImportant,
    user_id 
});

export const createValidator = (keys) => {
    let validator = {};
    if(keys.includes("todo_body")) validator.todo_body = todo_body;
    if(keys.includes("isImportant")) validator.isImportant = isImportant;
    return Joi.object({...validator});
}