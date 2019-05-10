const express = require('express');
const Handyman = require('../models/handyman');
const auth = require('../middleware/auth');
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



router.post('/handyman/login', async (req,res) => {
    try{
        const handyman = await Handyman.findByCredentials(req.body.username,req.body.password);
        const token = await handyman.generateAuthToken();
        res.send({handyman,token});
    }catch(e){
         
        res.status(400).send(e);
    }
});





router.get('/handyman', auth , async (req, res) => {
       
    try {
     
     const handymen =  await Handyman.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));
       console.log(handymen)
       res.send(handymen);
    } catch (e) {
       
        res.status(500).send();
    }
});


router.patch('/handyman/me',auth, async (req, res) => {
  
    const updates = Object.keys(req.body);
    const allowedUpdates = ['available'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if (!isValidOperation) {
        return res.status(400).send({ 'error': 'Invalid Operation' })
    }

    try {

         
        updates.forEach((update) => {
            req.handyman[update] = req.body[update];
        });

        await req.handyman.save();
        
        res.send(req.handyman);

    } catch (e) {

        res.status(400).send(e);
    }
});




module.exports = router;