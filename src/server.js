'use strict';

const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080 ;
const handle404Error = require('./error-handlers/404'); //Import handle404fun into  server and set it up to be “used” after the other routes
const error500Handle = require('./error-handlers/500');
const validator = require('./middleware/validator');
const clothesRouter = require('./routes/clothes');
const FoodRouter = require('./routes/food');




const loggerMiddleware = require('./middleware/logger');


app.get('/status', (req, res) => {

      res.status(200).send({

        "domain1": "dimaalabsi-api-server.herokuapp.com",
        "status": "running",
        "port": 8080

    });
});
app.get('/home', (req, res) => {
    res.status(200).send('All is going to be work here 🤩');
});
app.get('/error', (req, res, next) => {
    throw new Error('You made an Error 🙃');
});
app.post('/home', (req, res) => {
    res.status(200).send('All is going to be work here 🤩');
});

app.get('/person', validator, (req, res) => {
    res.send({
        name: req.query.name,
    })
});

app.use(loggerMiddleware);
app.use(express.json());
app.use(clothesRouter);
app.use(FoodRouter);

app.use('*', handle404Error);
app.use(error500Handle);




function start() {
    app.listen(PORT, () => {
        console.log(`listening to the port ${PORT}`);
    })
}

module.exports = {
    server: app,
    start: start
}
