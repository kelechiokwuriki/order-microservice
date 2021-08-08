const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    customerId: String,
    productId: String,
    status: String,
    amount: Number
}, {
    timeStamps: true
});

module.exports = mongoose.model('Order', OrderSchema);