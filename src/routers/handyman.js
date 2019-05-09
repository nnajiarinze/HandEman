const express = require('express');
const Handyman = require('../models/handyman');
//const auth = require('../middleware/auth');
//const multer = require('multer');
  
const router = new express.Router(); 



router.post('/handyman', async (req, res) => {

    const handyman = new Handyman(req.body);

    try {
        await handyman.save();
        //sendWelcomeEmail(user.email, user.name);
        const token = await handyman.generateAuthToken();
        res.status(201).send({handyman, token});
        //res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e);
    }
 
});


module.exports = router;