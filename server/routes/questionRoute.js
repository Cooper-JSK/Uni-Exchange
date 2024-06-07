import express from 'express';
import {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById
} from '../controllers/questionController.js';

const router = express.Router();

router.post('/', createQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);
router.patch('/:id', updateQuestionById);
router.delete('/:id', deleteQuestionById);





export default router;