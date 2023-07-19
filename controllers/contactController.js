const asyncHandler = require('express-async-handler');

//@desc - get all contacts
//@route - GET - api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({message:"Get all contacts"});
});

//@desc - get a unique contact
//@route - GET - api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res)=>{
    res.status(200).json({message:`Get a contact for ${req.params.id}`});
});

//@desc - create a contact
//@route - POST - api/contacts
//@access public
const createContact = asyncHandler(async (req, res)=>{
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    res.status(201).json({message:"Create new contact"});
});

//@desc - delete a contact
//@route - DELETE - api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res)=>{
    res.status(200).json({message:`Delete a contact for ${req.params.id}`});
});

//@desc - update a contact
//@route - PUT - api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res)=>{
    res.status(200).json({message:`Update a contact for ${req.params.id}`});
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact
};