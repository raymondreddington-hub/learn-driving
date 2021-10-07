const mongoose = require('mongoose');
const { Schema } = mongoose

const accountsSchema = new Schema({
    names: String,
    email: String,
    password: String,
    date: String,
})

mongoose.model('Accounts', accountsSchema);