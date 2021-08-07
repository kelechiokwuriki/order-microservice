const config = require('../../config/config.js');
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

    return res.status(201).send({
        success: true,
        data: true
    });
};

