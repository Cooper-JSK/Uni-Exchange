import express from 'express';
import {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById,
    getCategories, getQuestionsByCategory,
    getCount
} from '../controllers/questionController.js';
import { verifyToken } from '../utils/verifiedUser.js';

const router = express.Router();

router.post('/', createQuestion);
router.get('/', getAllQuestions);
router.get('/count', getCount);
router.get('/categories', getCategories);
router.get('/questions/category/:category', getQuestionsByCategory);
router.get('/:id', getQuestionById);
router.patch('/:id', verifyToken, updateQuestionById);
router.delete('/:id', verifyToken, deleteQuestionById);

router.get('/questions/category/:category', getQuestionsByCategory);





export default router;