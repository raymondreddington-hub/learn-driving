const mongoose = require('mongoose');
const { Schema } = mongoose

const accountsSchema = new Schema({
    names: String,
    email: String,
    password: String,
    date: String,
})

mongoose.model('Accounts', accountsSchema);

const feedbackSchema = new Schema({
    email: String,
    rating: Number,
    message: String,
    follow: String,
    date: String,
})

mongoose.model('Feedback', feedbackSchema);