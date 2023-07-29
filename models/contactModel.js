const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
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