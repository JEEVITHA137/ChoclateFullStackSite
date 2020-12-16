const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    flavour:{
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
    brand:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    }
});

var Products = mongoose.model('Products',productSchema);

module.exports = Products;
