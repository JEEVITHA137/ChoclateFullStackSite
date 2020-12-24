const express = require('express');
const bodyParser = require('body-parser');

const User = require('../schema/user');

const UserRouter = express.Router();

UserRouter.use(bodyParser.json());

UserRouter.route('/')
.post((req, res, next) => {
    User.create(req.body)
    .then((User) => {
        console.log('Customer Created ', User);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(User);
    }, (err) => next(err))
    .catch((err) => next(err));
})

UserRouter.route('/:mailId/:pass')
.get((req,res,next) => {
    User.find({ mailId: req.params.mailId , passWord: req.params.pass})
    .then((User) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(User);
    }, (err) => next(err))
    .catch((err) => next(err));
});

UserRouter.route('/:mailId')
.get((req,res,next) => {
    User.find({ mailId: req.params.mailId})
    .then((User) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(User);
    }, (err) => next(err))
    .catch((err) => next(err));
});

UserRouter.route('/addtocart')
.put((req,res,next) => {
    const mailid = req.body.mailId;
    const cart = req.body.cart;
    User.updateOne({mailId: mailid},{$set: {myCart:cart }})
    .then((User) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(User);
    }, (err) => next(err))
    .catch((err) => next(err));
})



module.exports = UserRouter;