const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
      cb(null,new Date().toISOString()+file.originalname);
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
    console.log(req.body)
    Product.create({
        name:req.body.name,
        material:req.body.material,
        cost:req.body.cost,
        quantity:req.body.quantity,
        color:req.body.color,
        brand:req.body.brand,
        img:req.file.path
    })
    .then((Product) => {
        console.log('Customer Created ', Product);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Product);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Customers');
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


module.exports =  ProductRouter;