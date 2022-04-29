const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const apiRouter = require('./Routes/router');

const port = 4200;
const app = express();

app.use(bodyparser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
    next();
});


app.use('/', apiRouter);


mongoose.connect('mongodb+srv://...@sandbox.uivdb.mongodb.net/zomato?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(success => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(error => {
    console.log("Error: ", error);
});
