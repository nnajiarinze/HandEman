const jwt = require('jsonwebtoken');
const Handyman= require('../models/handyman');

const auth = async (req,res,next) => {
     try{
        const token = req.header('Authorization').replace('Bearer ', '');;
      
        const decoded = jwt.verify(token.trim(),process.env.JWT_SECRET);
       
        const handyman = await Handyman.findOne({_id: decoded._id, 'tokens.token': token});
    
        if(!handyman){
            throw new Error();
        }
        req.token = token;
        req.handyman = handyman;
        next();

    }catch(e){
        res.status(401).send({error: 'Please authenticate' });
    }
} 

module.exports = auth;