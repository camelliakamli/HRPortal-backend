const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 2,
    },
    phone_number: { 
        type: String, 
        required: true, 
        min: 10,
        max: 10,
    },
    position: {
        type: String,
        required: true,
    },
    salary: { 
        type: Number,
        required: true,
    },
    department: { 
        type: String,
        required: true,
    },
    role: { 
        type: String,
        enum: ['employee', 'admin'], 
        default: 'user',
        required: true,
     },
     gender: {
        type: String,
        enum: ['female','male'],
        required: true,
     },
     hire_date: { 
        type: Date, 
        required: true,
     },

    }, {
        timestamps: true,
      });

const User = mongoose.model("User", UserSchema);
module.exports = mongoose.model("User", UserSchema);