const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    deviceId: {
        type: String
    }
  
},{
   timestamps: true 
});


const User = mongoose.model('User',userSchema);



module.exports = User;