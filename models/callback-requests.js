let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
let callbackRequestsSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
})

let CallbackRequests = mongoose.model('CallbackRequests', callbackRequestsSchema, 'callback-requests');

module.exports = {CallbackRequests};