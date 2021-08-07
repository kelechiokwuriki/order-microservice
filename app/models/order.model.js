const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    customerId: Number,
    productId: Number,
    amount: Number
}, {
    timeStamps: true
});

module.exports = mongoose.model('Order', OrderSchema);