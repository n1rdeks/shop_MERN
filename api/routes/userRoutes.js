import express from 'express';

import {
    authUser, getUserProfile,
    getUsers, registerUser, updateUserProfile,
    deleteUser, getUserById, updateUser
} from '../controllers/userController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';


const router = express.Router();

// fu fu route...
// This shit have fu orders. order fu matter!
// If i set /:id on top, all fu construction not work.
router.route('/')
    .post(registerUser)
    .get(protect, isAdmin, getUsers);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/:id')
    .delete(protect, isAdmin, deleteUser)
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUser);

router.post('/login', authUser);

export default router;
