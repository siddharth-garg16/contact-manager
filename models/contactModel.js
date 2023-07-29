const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add the contact name."],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Please add the contact email."],
        trim: true
    },
    phone:{
        type: String,
        required: [true, "Please add the contact number."],
        trim: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Contact", contactSchema)