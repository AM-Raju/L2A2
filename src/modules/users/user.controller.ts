import { Request, Response } from 'express';
import zodUserSchema from './user.validation';
import { UserServices } from './user.service';

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

export const UserControllers = {
  createUser,
  getUsers,
};
