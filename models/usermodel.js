const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    cart:{
        type: Array,
        default:"[]",

    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },
    wislist:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"

    },
},
{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('User', userSchema);