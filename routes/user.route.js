import express from 'express';
import { createUser,signIn } from '../controllers/auth.controller.js';
import { fetchProductsForUser } from '../controllers/user-contollers/fetchproducts.controller.js';

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/sign-in', signIn);
router.get('/fetchProducts', fetchProductsForUser);
export default router;
