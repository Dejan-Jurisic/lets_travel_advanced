let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let usersSchema = new Schema({
    email: String,
    password: String
})

let User = mongoose.model('User', usersSchema, 'users');

module.exports = {User};
