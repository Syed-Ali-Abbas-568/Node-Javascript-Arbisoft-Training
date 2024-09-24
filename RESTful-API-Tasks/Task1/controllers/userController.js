import User from '../models/userModel.js';
import Product from '../models/productModel.js';
// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });


    try {
        const createdUser = await user.save();
        return res.status(201).json(createdUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;

            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.status(200).json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Add product to user's cart
export const addToCart = async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;

    try {
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user || !product) {
            return res.status(404).json({ message: 'User or Product not found' });
        }

        user.cart.push(productId);  // Add product to user's cart
        await user.save();

        res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Remove product from cart
export const removeFromCart = async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const productIndex = user.cart.indexOf(productId);

        if (productIndex === -1) {
            return res.status(400).json({ message: 'Product not in cart' });
        }

        user.cart.splice(productIndex, 1);  // Remove product from cart
        await user.save();

        res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's cart
export const getCart = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).populate('cart');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Calculate total cost of cart
export const calculateTotalCost = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).populate('cart');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const totalCost = user.cart.reduce((sum, product) => sum + product.price, 0);

        res.status(200).json({ totalCost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear user's cart
export const clearCart = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = [];  // Clear the cart
        await user.save();

        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};