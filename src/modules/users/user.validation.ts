import { z } from 'zod';

const zodFullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const zodAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
const zodOrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const zodUserSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: zodFullNameSchema,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: zodAddressSchema,
  // orders: zodOrderSchema.array().optional(),
  orders: zodOrderSchema.array().optional(),
});

const zodUpdateUserSchema = z.object({
  userId: z.number().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: zodFullNameSchema.optional(),
  age: z.number().optional(),
  email: z.string().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.string().array().optional(),
  address: zodAddressSchema.optional(),
});

export const UserValidations = {
  zodUserSchema,
  zodUpdateUserSchema,
};
