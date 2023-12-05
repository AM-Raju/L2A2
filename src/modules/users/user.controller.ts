import { Request, Response } from 'express';
import { UserValidations } from './user.validation';
import { UserServices } from './user.service';
import { Order } from './user.interface';

// Controller to create user into DB
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const zodParsedData = UserValidations.zodUserSchema.parse(user);
    const result = await UserServices.createUserIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
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
      message: 'Users fetched successfully!',
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
    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.send({
        success: false,
        message: 'User not found',
        data: result,
      });
    }
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

    const zodParsedData = UserValidations.zodUserSchema.parse(updatedUserInfo);

    const result = await UserServices.updateUserFromDB(filter, zodParsedData);

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
// Controller insert order by id to user
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
      message: 'Order created successfully!',
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

// get all orders from an specific users
const getOrdersOfUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await UserServices.getOrdersOfUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: result ? 'Order fetched successfully!' : 'No order found',
      data: result ? { orders: result } : null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// get all orders calculate total price of an order
const calculateTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await UserServices.calculateTotalOrderPriceFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: result },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User / order not found',
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
  getOrdersOfUser,
  calculateTotalOrderPrice,
};
