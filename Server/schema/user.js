const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const addressSchema = new Schema({
    HouseNo:{
        type: String
    },
    Street:{
        type:String
    },
    LandMark:{
        type:String
    },
    Town:{
        type:String
    },
    District:{
        type:String
    },
    Pincode:{
        type:Number
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
    phoneNo:{
        type:Number
    },
    address:{
        type:addressSchema
    },
    myCart : []
});

var Users = mongoose.model('User',userSchema);

module.exports = Users;