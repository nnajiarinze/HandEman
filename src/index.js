const app = require('./app');
const port = process.env.PORT;


app.listen(port, () => {
    console.log('server is up on port ', port);
});



////mongodb+srv://handyman:passworded@cluster0-tvbca.mongodb.net/test?retryWrites=true