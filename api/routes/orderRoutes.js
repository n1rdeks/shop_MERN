import express from 'express';

import {
    addOrderItems,
    getOrderById,
    getUserOrders,
    getOrdersList
} from '../controllers/orderController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrdersList);
router.route('/userorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);

export default router;
