const express = require('express');
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./model/Accounts')
const app = express()
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

mongoose.connect(keys.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});

require('./routes/registration')(app);

app.listen(keys.port, () => {
    console.log('listening in db')
})