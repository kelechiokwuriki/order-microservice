const Order = require('../models/order.model.js');
const axios = require('axios')
const { paymentService } = require('../../config/config.js');

exports.createOrder = async (req, res) => {
    // validate request
    if (!req.body.customerId || !req.body.productId || !req.body.amount) {
        return res.status(400).send({
            success: false,
            message: 'Bad request. Customer id or product id or amount missing.'
        });
    }
    const {customerId, productId, amount} = req.body;

    const newOrder = new Order({customerId, productId, amount, status: 'pending'});

    const orderSaved = await newOrder.save();

    if (!orderSaved) {
        // log to kibana
        console.error(`An error occured while creating the order. 
        CustomerId: ${customerId}, ProductId: ${productId}, Amount: ${amount}`);

        return res.status(400).send({
            success: false,
            message: 'An error occured while creating the order.'
        });
    }

    const orderData = {
        order: orderSaved,
        productId,
        customerId,
        amount
    }

    try {
        const {data} = await axios.post(`${paymentService.url}/payment`, orderData);
        delete orderData.order;
        orderData.orderId = orderSaved._id;
        orderData.orderStatus = orderSaved.status;
        
        return res.status(201).send({
            success: true,
            message: data.message,
            data: orderData
        }); 
    } catch (e) {
        console.error('An error occured while sending order to the payment service. Error: ', error);
        return res.status(400).send({
            success: false,
            message: 'An error occured while billing the order.'
        });
    }
};

