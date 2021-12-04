const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    address: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: false
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "role"
        }
    ]
});

const User = mongoose.model('user', userSchema);

module.exports = User;