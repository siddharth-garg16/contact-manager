const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc - get all contacts
//@route - GET - api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc - get a unique contact
//@route - GET - api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc - create a contact
//@route - POST - api/contacts
//@access public
const createContact = asyncHandler(async (req, res)=>{
    const {name, email, phone} = req.body;
    if(!name){
        res.status(400);
        throw new Error("Name is a mandatory field.");
    }
    if(!email){
        res.status(400);
        throw new Error("Email is a mandatory field.");
    }
    if(!phone){
        res.status(400);
        throw new Error("Phone is a mandatory field.");
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
});

//@desc - delete a contact
//@route - DELETE - api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).json(contact);
});

//@desc - update a contact
//@route - PUT - api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact);
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact
};