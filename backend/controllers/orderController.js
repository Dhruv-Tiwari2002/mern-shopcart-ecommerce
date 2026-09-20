import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
    try {
        // 1. Destructure all possible names the frontend might be using for the cart array
        const { products, orderItems, cartItems, shippingAddress, totalPrice, paymentStatus } = req.body;

        // 2. Safely capture whichever array actually contains the data
        const incomingItems = products || orderItems || cartItems;

        // 3. STRICT CHECK: If it is undefined or empty, stop immediately and throw a clean error!
        if (!incomingItems || incomingItems.length === 0) {
            return res.status(400).json({ message: 'No order items were received by the server.' });
        }

        // 4. Transform the data securely safely because we know incomingItems exists
        const mappedItems = incomingItems.map((item) => ({
            product: item._id || item.product,     
            quantity: item.qty || item.quantity,   
            price: item.price
        }));

        const order = new Order({
            user: req.user._id,
            products: mappedItems,
            shippingAddress,
            totalPrice,
            paymentStatus: paymentStatus || 'pending'
        });

        const createdOrder = await order.save();

        // Empty the user's cart after a successful checkout
        await User.findByIdAndUpdate(req.user._id, { cart: [] });

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders
// @access  Private
export const getUserOrders = async (req, res) => {
    try {
        // Finds all orders where the user ID matches the logged-in user's token
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        // Populate pulls in the user's name/email AND the product's name/image
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('products.product', 'name image'); // <-- This line fetches the missing data

        if (order) {
            // Security Check: Is the user the owner of the order OR an admin?
            if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to view this order' });
            }
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Invalid Order ID' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.orderStatus = req.body.orderStatus || order.orderStatus;
            order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};