// routes/authRoute.js
import express from 'express';
import { signup, signin } from '../controllers/authController.js';

const router = express.Router();

// Define the signup route
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
