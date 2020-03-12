var mongoose = require('./connection');

var productSchema = mongoose.Schema({
    name: String,
    price: Number,
    tva: Number, 
});

var menuSchema = mongoose.Schema({
    category: String,
    products: [productSchema], 
});

var tableSchema = mongoose.Schema({
    tableName: String,
    tableToken: String,
    tableQrCode: String,
});

var proUserSchema = mongoose.Schema({
    email: String,
    salt: String,
    password: String,
    token: String,
    table: [tableSchema],
    menu: [menuSchema]
});

var ProUserModel = mongoose.model('proUser', proUserSchema);

module.exports = ProUserModel;