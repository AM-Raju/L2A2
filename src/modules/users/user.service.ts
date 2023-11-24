import { User } from './user.interface';
import { UserModel } from './user.model';

// Service to create use into DB
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
