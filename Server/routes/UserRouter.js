const express = require('express');
const bodyParser = require('body-parser');

const User = require('../schema/user');

const UserRouter = express.Router();

UserRouter.use(bodyParser.json());

UserRouter.route('/')
.get((req,res,next) => {
    User.find({})
    .then((User) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(User);
    }, (err) => next(err))
    .catch((err) => next(err));
})
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
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Customers');
})
.delete((req, res, next) => {
    User.remove({})
    .then((User) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Useru);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

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

module.exports = UserRouter;