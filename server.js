const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routes/order.routes.js')(app);

app.listen(4000, () => {
    console.log('API running on port 4000');
})

