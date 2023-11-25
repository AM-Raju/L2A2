import { User } from './user.interface';
import { UserModel } from './user.model';

// Service to create use into DB
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

// Service get all users from DB
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

// Service to get user by id
const getUserByIdFromDB = async (id: number) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
};
