const express = require('express');
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./model/Accounts')
const app = express()

mongoose.connect(keys.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});

require('./routes/registration')(app);

app.listen(keys.port, () => {
    console.log('listening')
})