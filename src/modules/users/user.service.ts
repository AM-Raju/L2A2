import { Order, User } from './user.interface';
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

/* =================== Order block started ============== */

// Service to insert order in user data
const insertOrderToUserCollection = async (userId: number, newOrder: Order) => {
  const filter = { userId };
  // const options = { upsert: true };

  const updateOrders = {
    $push: {
      orders: newOrder,
    },
  };
  let result;
  if (filter) {
    result = await UserModel.updateOne(filter, updateOrders);
  }
  return result;
};

// Service to get all orders of a users
const getOrdersOfUserFromDB = async (userId: number) => {
  const user = await UserModel.findOne({ userId });

  const result = user?.orders;
  return result;
};

// Service to calculate total price of an user's orders
const calculateTotalOrderPriceFromDB = async (userId: number) => {
  const result = await UserModel.aggregate([
    // Stage one
    { $match: { userId } },

    // stage 2
    {
      $unwind: '$orders',
    },

    // Stage 3
    {
      $group: {
        _id: '$_id',
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },

    // Stage four
    {
      $project: { totalPrice: { $round: ['$totalPrice', 2] } },
    },
  ]);

  return result[0].totalPrice;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserFromDB,
  deleteUserByIdFromDB,
  insertOrderToUserCollection,
  getOrdersOfUserFromDB,
  calculateTotalOrderPriceFromDB,
};
