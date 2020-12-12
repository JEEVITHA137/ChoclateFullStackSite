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

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    mailId:{
        type: String,
        required: true,
        unique: true
    },
    passWord:{
        type: String,
        required: true
    },
    address:{
        type: addressSchema
    },
    myorders:[],
    myCart : []
});

var Users = mongoose.model('User',userSchema);

module.exports = Users;