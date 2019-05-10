const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const handymanSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type:String,
        unique: true,
        required: true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }  
    },
   
    password:{
        type:String,
        minlength:7,
        required:true,
        trim: true,
       
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"');
            }
        }
    },  
    occupation : {
        type: String,
        required:true,
        trim: true
    },
    baseRate : {
        type: Number,
        required: true,
        validate(value){
            if(value < 0){
                throw new Error('value must be a positive number');
            }
        }
    },
    hourlyRate : {
        type: Number,
        required: true,
        validate(value){
            if(value < 0){
                throw new Error('value must be a positive number');
            }
        }
    },
    location : {
        type: String,
        required: true
    },
    available:{
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},{
   timestamps: true 
});

// handymanSchema.virtual('tasks', {
//     ref: 'Tasks',
//     localField:'_id',
//     foreignField: 'owner'
// })


handymanSchema.methods.generateAuthToken = async function () {
    const handyman = this;
    const token = jwt.sign({_id: handyman._id.toString()}, process.env.JWT_SECRET);
    
    handyman.tokens =  handyman.tokens.concat({token});
    await handyman.save();
 return token;
    
}

handymanSchema.methods.toJSON = function () {
    const handyman = this;
    const handymanObject = handyman.toObject();
    delete handymanObject.password;
    delete handymanObject.tokens;
    delete handymanObject.avatar;
    
    return handymanObject;
}

handymanSchema.statics.findByCredentials = async (username,password) => {
    const handyman = await Handyman.findOne({username: username});
   
    if(!handyman) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password,handyman.password);
    
    if(!isMatch){
        throw new Error('Unable to login');
    }

    return handyman;

}


// has the plain text password before saving
handymanSchema.pre('save', async function (next) {
    const handyman = this;

    if(handyman.isModified('password')) {
        handyman.password = await bcrypt.hash(handyman.password, 8);
    }
    next();
});

// //delete user tasks when user is removed
// handymanSchema.pre('remove', async function (next){
//     const user = this;

//     await Task.deleteMany({owner: user._id});
//     next();
// })

const Handyman = mongoose.model('handyman',handymanSchema);



module.exports = Handyman;