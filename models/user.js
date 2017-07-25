//required mongoose library
var mongoose = require('mongoose');
//create new schema
var Schema = mongoose.Schema;
//add a mongoose plugin to support uniq entries check in database
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    registrationMethod: {type: String, required: true}
});
//add plugin usage to schema
schema.plugin(mongooseUniqueValidator);

//and export the schema
module.exports = mongoose.model('User', schema);