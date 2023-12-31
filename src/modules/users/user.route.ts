import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getUsers);
router.get('/:userId', UserControllers.getUserById);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUserById);

// Routes for orders
router.put('/:userId/orders', UserControllers.insertOrder);
router.get('/:userId/orders', UserControllers.getOrdersOfUser);
router.get(
  '/:userId/orders/total-price',
  UserControllers.calculateTotalOrderPrice,
);

export const UserRoutes = router;
