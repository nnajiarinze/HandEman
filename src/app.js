const express = require('express');
require('./db/mongoose');
const handymanRouter = require('./routers/handyman');
const app = express();





app.use(express.json());
app.use(handymanRouter);

module.exports = app;
