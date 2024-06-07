import express from 'express';
import {
    createAnswer,
    getAllAnswers,
    getAnswerById,
    getAnswersByQuestionId,
    updateAnswerById,
    deleteAnswerById
} from '../controllers/answerController.js';

const router = express.Router();

router.post('/', createAnswer);
router.get('/', getAllAnswers);
router.get('/:id', getAnswerById);
router.get('/question/:questionId', getAnswersByQuestionId);
router.patch('/:id', updateAnswerById);
router.delete('/:id', deleteAnswerById);

export default router;
