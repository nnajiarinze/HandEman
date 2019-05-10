 const mongoose = require('mongoose');
const validator = require('validator');


const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    handyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'handyman'
    },
    amount:{
        type:Number,
        required:false
    },
    status:{
        type: Boolean,
        default: false
    },
    startTime:{
        type:Date,
        default: Date.now
    },
    endTime:{
        type:Date
    }
  
},{
   timestamps: true 
});



 
const Order = mongoose.model('Order',orderSchema);



module.exports = Order;