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
exports.UserControllers = void 0;
const user_validation_1 = require("./user.validation");
const user_service_1 = require("./user.service");
// Controller to create user into DB
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const zodParsedData = user_validation_1.UserValidations.zodUserSchema.parse(user);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// Controller to get all users from DB
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// Controller to get user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.getUserByIdFromDB(userId);
        if (result !== null) {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: result,
            });
        }
        else {
            res.send({
                success: false,
                message: 'User not found',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// Controller to update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const filter = { userId };
        const updatedUserInfo = req.body;
        const zodParsedData = user_validation_1.UserValidations.zodUserSchema.parse(updatedUserInfo);
        const result = yield user_service_1.UserServices.updateUserFromDB(filter, zodParsedData);
        res.status(200).json({
            success: result === null ? false : true,
            message: result === null ? 'User not found' : 'User updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// Controller to delete user by id
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.deleteUserByIdFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: result.deletedCount === 0 ? null : result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
/* =================== Order block started ============== */
// Controller insert order by id to user
const insertOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const newOrder = req.body;
        const result = yield user_service_1.UserServices.insertOrderToUserCollection(userId, newOrder);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// get all orders from an specific users
const getOrdersOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.getOrdersOfUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: result ? 'Order fetched successfully!' : 'No order found',
            data: result ? { orders: result } : null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// get all orders calculate total price of an order
const calculateTotalOrderPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.calculateTotalOrderPriceFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: { totalPrice: result },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User / order not found',
            error: err,
        });
    }
});
exports.UserControllers = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUserById,
    insertOrder,
    getOrdersOfUser,
    calculateTotalOrderPrice,
};
