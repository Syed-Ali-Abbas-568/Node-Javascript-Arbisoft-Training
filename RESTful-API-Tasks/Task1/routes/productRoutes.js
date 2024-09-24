import express from 'express';
import { getProducts, addProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// Get all products
router.route('/')
    .get(getProducts)  // Get all products
    .post(addProduct);  // Add a new product

// Delete a product by ID
router.route('/:id')
    .delete(deleteProduct);  // Delete a product

export default router;
