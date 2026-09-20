import User from '../models/userModel.js';

// @desc    Get logged in user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
    try {
        // We use .populate() to get the actual product details, not just the ObjectIds
        const user = await User.findById(req.user._id).populate('cart.product', 'title price images stock');
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user._id);

        // Check if product is already in the cart
        const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // If it exists, just update the quantity
            user.cart[itemIndex].quantity += quantity || 1;
        } else {
            // If it's new, push it to the array
            user.cart.push({ product: productId, quantity: quantity || 1 });
        }

        await user.save();
        res.status(201).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
export const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const user = await User.findById(req.user._id);

        const itemIndex = user.cart.findIndex(item => item.product.toString() === req.params.id);

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity = quantity;
            await user.save();
            res.json(user.cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart OR empty cart entirely
// @route   DELETE /api/cart/:id
// @access  Private
export const removeCartItem = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // If the ID passed is literally the word "empty", we clear the whole array
        if (req.params.id === 'empty') {
            user.cart = [];
        } else {
            // Otherwise, filter out the specific product
            user.cart = user.cart.filter(item => item.product.toString() !== req.params.id);
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};