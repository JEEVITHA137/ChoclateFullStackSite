const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    HouseNo:{
        type: String
    },
    Street:{
        type:String,
        required: true
    },
    LandMark:{
        type:String,
        required: true
    },
    Town:{
        type:String,
        required: true
    },
    District:{
        type:String,
        required: true
    },
    Pincode:{
        type:Number,
        required: true
    }
})

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
    },
    quantity:{
        type:Number,
        required:true
    },
    Address:{
        type:addressSchema,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    }
});

var Orders = mongoose.model('Order',orderSchema);

module.exports = Orders;
