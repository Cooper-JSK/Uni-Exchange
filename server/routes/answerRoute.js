import express from 'express';
import {
    createAnswer,
    getAllAnswers,
    getAnswerById,
    getAnswersByQuestionId,
    updateAnswerById,
    deleteAnswerById
} from '../controllers/answerController.js';
import { verifyToken } from '../utils/verifiedUser.js';

const router = express.Router();

router.post('/', verifyToken, createAnswer);
router.get('/', getAllAnswers);
router.get('/:id', getAnswerById);
router.get('/question/:questionId', getAnswersByQuestionId);
router.patch('/:id', updateAnswerById);
router.delete('/:id', deleteAnswerById);

export default router;
