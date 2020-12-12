const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    material:{
        type: String,
        required: true
    },
    cost:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true
    }, 
    color:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
});

var Products = mongoose.model('Products',productSchema);

module.exports = Products;
