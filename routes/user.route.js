import express from 'express';
import { createUser,signIn } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/sign-in', signIn);

export default router;
