const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: {type: String, require: true},
    rollNo: {type: String, require: true},
    branch: {type: String, require: true},
    gender: {type: String, require: true},
    email: {type: String, require: true},
    dateOfBirth: {type: String, require: true},
    password: {type: String, require: true},
    isRegistered: {type: Boolean, default: false}
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);