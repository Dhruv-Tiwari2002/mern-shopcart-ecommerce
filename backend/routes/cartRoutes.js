import express from 'express';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
} from '../controllers/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All cart routes require the user to be logged in
router.get('/', verifyToken, getCart);
router.post('/', verifyToken, addToCart);
router.put('/:id', verifyToken, updateCartItem);
router.delete('/:id', verifyToken, removeCartItem);

export default router;