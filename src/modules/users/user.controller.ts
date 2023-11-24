import { Request, Response } from 'express';
import zodUserSchema from './user.validation';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    console.log('dahak', user);

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

export const UserControllers = {
  createUser,
};
