import express from 'express';

import {
    authUser, getUserProfile,
    getUsers, registerUser, updateUserProfile,
    deleteUser
} from '../controllers/userController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.route('/:id').delete(protect, isAdmin, deleteUser);

router.post('/login', authUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);


export default router;
