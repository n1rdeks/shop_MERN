import expressAsyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';

// @route   POST /api/orders
// @access  Private
const addOrderItems = expressAsyncHandler(async (req, res) => {
    const {
        orderItems, shippingAddress, paymentMethod,
        itemsPrice, taxPrice, shippingPrice, totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @route   GET /api/orders/:id
// @access  Private
const getOrderById = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @route   GET /api/orders/userOrders
// @access  Private
const getUserOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @route   GET /api/orders
// @access  Private/Admin
const getOrdersList = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

export {
    addOrderItems,
    getOrderById,
    getUserOrders,
    getOrdersList
};
