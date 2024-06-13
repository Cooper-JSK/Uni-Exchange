import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserQuestions,
    getUserAnswers
} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifiedUser.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/:id/questions', getUserQuestions);
router.get('/:id/answers', getUserAnswers);
router.patch('/:id', verifyToken, updateUserById);
router.delete('/:id', deleteUserById);

export default router;


