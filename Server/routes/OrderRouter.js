const express = require('express');
const bodyParser = require('body-parser');

const Order = require('../schema/orders');

const OrderRouter = express.Router();

OrderRouter.use(bodyParser.json());

OrderRouter.route('/')
.get((req,res,next) => {
    Order.find({})
    .then((Order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Order);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Order.create(req.body)
    .then((Order) => {
        console.log('Order Processed ', Order);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Order);
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = OrderRouter;