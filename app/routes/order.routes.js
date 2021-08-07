module.exports = (app) => {
    const orderController = require('../controllers/order.controller.js');
    
    // place an order
    app.post('/order', orderController.createOrder);
}