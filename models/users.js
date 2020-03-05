var mongoose = require('./connection');

var userSchema = mongoose.Schema({
    email: String,
    salt: String,
    password: String,
    token: String,
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;
