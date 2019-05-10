const express = require('express');
require('./db/mongoose');
const handymanRouter = require('./routers/handyman');
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');
const app = express();





app.use(express.json());
app.use(handymanRouter);
app.use(userRouter);
app.use(orderRouter);

module.exports = app;
