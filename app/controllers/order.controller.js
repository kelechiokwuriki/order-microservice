const config = require('../../config/config.js');
const Order = require('../models/order.model.js');
const axios = require('axios')

const { paymentService } = config;

exports.createOrder = async (req, res) => {
    // validate request
    if (!req.body.customerId || !req.body.productId || !req.body.amount) {
        return res.status(400).send({
            success: false,
            message: 'Bad request. Customer id or product id or amount missing.'
        });
    }

    // save order
    const newOrder = new Order({
        'customerId': req.body.customerId,
        'productId': req.body.productId,
        'amount': req.body.amount
    });

    const orderSaved = await newOrder.save();

    if (!orderSaved) {
        console.error(`An error occured while creating the order. 
        CustomerId: ${req.body.customerId}, ProductId: ${req.body.productId}, Amount: ${req.body.amount}`);

        return res.status(400).send({
            success: false,
            message: 'An error occured while creating the order.'
        });
    }

    return res.status(201).send({
        success: true,
        message: 'Order created successfully',
        data: orderSaved
    });
};

