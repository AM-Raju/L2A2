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
const getUserByIdFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

// Service to update user
const updateUserFromDB = async (
  filter: { userId: number },
  updatedUserInfo: User,
) => {
  const result = await UserModel.findOneAndUpdate(filter, updatedUserInfo, {
    new: true,
  });
  return result;
};

// Service to delete user by id
const deleteUserByIdFromDB = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserFromDB,
  deleteUserByIdFromDB,
};
