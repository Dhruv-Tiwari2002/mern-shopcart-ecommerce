import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Routes
router.post('/', verifyToken, createOrder);

router.get('/myorders', verifyToken, getUserOrders); 

router.get('/:id', verifyToken, getOrderById);

// Admin Routes
router.put('/:id', verifyToken, isAdmin, updateOrderStatus);

export default router;