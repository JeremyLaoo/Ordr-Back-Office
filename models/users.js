var mongoose = require('./bdd');

var userSchema = mongoose.Schema({
    firstname: String,
    email: String,
    password: String,
    token: String,
    lang: String
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;
