const express = require('express');
const Order = require('../models/order');

const router = new express.Router();



router.post('/order', async (req, res) => {

    const order = new Order(req.body);

    try {
        await order.save();
        res.status(201).send({ order });

    } catch (e) {
        res.status(400).send(e);
    }

});

router.post('/order/end/:orderId', async (req, res) => {

    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);


        if (!order) {
            throw new Error();
        }

        res.status(200).send({ order });

    } catch (e) {
        res.status(500).send();
    }



});



module.exports = router;