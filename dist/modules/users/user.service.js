"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
// Service to create use into DB
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
// Service get all users from DB
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find();
    return result;
});
// Service to get user by id
const getUserByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId });
    return result;
});
// Service to update user
const updateUserFromDB = (filter, updatedUserInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate(filter, updatedUserInfo, {
        new: true,
    });
    return result;
});
// Service to delete user by id
const deleteUserByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.deleteOne({ userId });
    return result;
});
/* =================== Order block started ============== */
// Service to insert order in user data
const insertOrderToUserCollection = (userId, newOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { userId };
    // const options = { upsert: true };
    const updateOrders = {
        $push: {
            orders: newOrder,
        },
    };
    let result;
    if (filter) {
        result = yield user_model_1.UserModel.updateOne(filter, updateOrders);
    }
    return result;
});
// Service to get all orders of a users
const getOrdersOfUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ userId });
    const result = user === null || user === void 0 ? void 0 : user.orders;
    return result;
});
// Service to calculate total price of an user's orders
const calculateTotalOrderPriceFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.aggregate([
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
});
exports.UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateUserFromDB,
    deleteUserByIdFromDB,
    insertOrderToUserCollection,
    getOrdersOfUserFromDB,
    calculateTotalOrderPriceFromDB,
};
