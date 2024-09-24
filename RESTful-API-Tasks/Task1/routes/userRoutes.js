import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addToCart,
    removeFromCart,
    getCart,
    calculateTotalCost,
    clearCart
} from '../controllers/userController.js';

const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Cart routes
router.route('/:id/cart')
    .get(getCart)  
    .post(addToCart)  
    .delete(clearCart); 

router.route('/:id/cart/remove').post(removeFromCart);  
router.route('/:id/cart/total').get(calculateTotalCost);  

export default router;
