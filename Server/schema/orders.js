const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    UserId:{
        type: String,
        required: true
    },
    Tracking:{
        type: String,
        required: true,
    },
    ProductId:{
        type: String,
        required: true
    }
});

var Orders = mongoose.model('Order',orderSchema);

module.exports = Orders;
