const sgMail = require('@sendgrid/mail');


//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey('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');

 
const sendWelcomeEmail = (email, name) => {
 console.log(' i got here');
    sgMail.send({
        to: email,
        from: 'me@test.com',
        subject: 'Thanks for joining us',
        text:  `Hey Handy, welcome to the app ${name}. Let me know how you get along with the app`
        
    });
}

 

module.exports = {
    sendWelcomeEmail
   
}