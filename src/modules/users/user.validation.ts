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
});

export default zodUserSchema;
