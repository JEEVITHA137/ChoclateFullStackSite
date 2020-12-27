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
.put((req,res,next) => {
    Order.updateOne({_id:req.body.id},{$set: {Tracking: req.body.Tracking}})
    .then((Order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Order);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Order.deleteOne({UserId:req.body.mailId,ProductId:req.body.ProductId})
    .then(( Order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Order);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

OrderRouter.route('/:mailId')
.get((req,res,next) => {
    Order.find({UserId: req.params.mailId})
    .then((Order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Order);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = OrderRouter;