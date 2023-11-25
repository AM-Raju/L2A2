import { Schema, model, connect, SchemaTypes } from 'mongoose';
import { Address, FullName, Order, User } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// Schema for full name
const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// Schema for address
const addressSchema = new Schema<Address>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

// Schema for order
const orderSchema = new Schema<Order>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

// Schema for user
const userSchema = new Schema<User>(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: fullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: { type: addressSchema, required: true },
    orders: { type: orderSchema },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        return ret;
      },
    },
  },
);

/* =============== Middleware block starts ================== */
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

/* userSchema.post('save', function (doc, next) {
  doc.updateOne({ $unset: { password: 1 } });
  next();
}); */

/* =============== Middleware block ends ================== */

// User model creation
export const UserModel = model<User>('User', userSchema);
