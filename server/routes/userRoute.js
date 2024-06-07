import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
