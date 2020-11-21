import express from 'express';

import {
    addOrderItems,
    getOrderById,
    getUserOrders
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/userorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);



export default router;
