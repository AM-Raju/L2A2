import { Request, Response } from 'express';
import zodUserSchema from './user.validation';
import { UserServices } from './user.service';
import { Order } from './user.interface';

// Controller to create user into DB
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const zodParsedData = zodUserSchema.parse(user);
    const result = await UserServices.createUserIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully.',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// Controller to get all users from DB
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Got all Students',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// Controller to get user by id
const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getUserByIdFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Got single student by id',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// Controller to update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const filter = { userId };
    const updatedUserInfo = req.body;

    const result = await UserServices.updateUserFromDB(filter, updatedUserInfo);

    res.status(200).json({
      success: result === null ? false : true,
      message:
        result === null ? 'User not found' : 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// Controller to delete user by id
const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await UserServices.deleteUserByIdFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result.deletedCount === 0 ? null : result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

/* =================== Order block started ============== */
// Controller to delete user by id
const insertOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const newOrder: Order = req.body;

    const result = await UserServices.insertOrderToUserCollection(
      userId,
      newOrder,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const UserControllers = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUserById,
  insertOrder,
};
