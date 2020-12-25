const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'../Client/public/');
    },
    filename: function(req,file,cb){
      cb(null,file.originalname);
    }
})

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    }
});

const Product = require('../schema/products');

const ProductRouter = express.Router();

ProductRouter.use(bodyParser.json());

ProductRouter.route('/')
.get((req,res,next) => {
    Product.find({})
    .then((product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(upload.single('productimage'),(req, res, next) => {
    Product.create({
        name:req.body.name,
        flavour:req.body.flavour,
        cost:req.body.cost,
        quantity:req.body.quantity,
        brand:req.body.brand,
        img:req.file.originalname
    })
    .then((Product) => {
        console.log('Customer Created ', Product);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Product);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    const id = req.body.id;
    const quantity = req.body.quantity;
    Product.updateOne({_id:id},{$set: {quantity:quantity}})
    .then((Product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Product);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Product.remove({})
    .then(( Product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Product);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

ProductRouter.route('/:brand/:cost')
.get((req,res,next) => {
    Product.find({ brand:req.params.brand,cost:req.params.cost})
    .then((Product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Product);
    }, (err) => next(err))
    .catch((err) => next(err));
});

ProductRouter.route('/brands')
.get((req,res,next) => {
    Product.find().distinct('brand')
    .then((Product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Product);
    }, (err) => next(err))
    .catch((err) => next(err));
});

ProductRouter.route('/flavour')
.get((req,res,next) => {
    Product.find().distinct('flavour')
    .then((Product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Product);
    }, (err) => next(err))
    .catch((err) => next(err));
});

ProductRouter.route('/:id')
.get((req,res,next) => {
    Product.find({_id:req.params.id}).select("quantity")
    .then((Product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Product);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports =  ProductRouter;