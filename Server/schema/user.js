const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const OrderSchema = new Schema({
    
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
    address:[],
    myCart : []
});

var Users = mongoose.model('User',userSchema);

module.exports = Users;