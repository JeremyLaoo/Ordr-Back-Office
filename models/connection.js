var mongoose = require('mongoose');

var options = { connectTimeoutMS: 5000, useNewUrlParser: true, useUnifiedTopology : true}

mongoose.connect('mongodb+srv://admin:admin@cluster0-slwxm.mongodb.net/test?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`Connection Database error : ${err}`);
    } else {
      console.info('You are connected to the Database');
    }
   }
);

module.exports = mongoose;