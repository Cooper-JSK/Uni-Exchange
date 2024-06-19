import express from 'express';
import {
    createAnswer,
    getAllAnswers,
    getAnswerById,
    getAnswersByQuestionId,
    updateAnswerById,
    deleteAnswerById, getCount, upVoteAnswer, downVoteAnswer
} from '../controllers/answerController.js';
import { verifyToken } from '../utils/verifiedUser.js';

const router = express.Router();

router.post('/', verifyToken, createAnswer);
router.get('/', getAllAnswers);

router.get('/count', getCount);
router.get('/:id', getAnswerById);
router.post('/:id/upvote', verifyToken, upVoteAnswer)
router.post('/:id/downvote', verifyToken, downVoteAnswer)
router.get('/question/:questionId', getAnswersByQuestionId);
router.patch('/:id', verifyToken, updateAnswerById);
router.delete('/:id', verifyToken, deleteAnswerById);

export default router;
