"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const zodFullNameSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const zodAddressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const zodOrderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const zodUserSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: zodFullNameSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.string().array(),
    address: zodAddressSchema,
    // orders: zodOrderSchema.array().optional(),
    orders: zodOrderSchema.array().optional(),
});
const zodUpdateUserSchema = zod_1.z.object({
    userId: zod_1.z.number().optional(),
    username: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    fullName: zodFullNameSchema.optional(),
    age: zod_1.z.number().optional(),
    email: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
    hobbies: zod_1.z.string().array().optional(),
    address: zodAddressSchema.optional(),
});
exports.UserValidations = {
    zodUserSchema,
    zodUpdateUserSchema,
};
