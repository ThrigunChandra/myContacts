const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");


//@desc GET request to get all Contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
}
)

//@desc POST request to create a new contact
const createContact = asyncHandler(async (req, res) => {
    console.log("Received request", req.body)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    try{
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id: req.user.id
        });
        console.log("Contact saved successfully:", contact)
        res.status(201).json(contact);
    }catch(err){
        console.error("Error saving contact", err);
        res.status(process.env.SERVER_ERROR).json({message:"Error saving contact"});
    }
})

//@desc GET request to get a specific contact with params
// @access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update osthe user contacts")
    }
    res.status(200).json(contact);
})


//@desc PUT request to update specific contact with params
// @access private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update osthe user contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, 
        {new: true}
    )
    console.log("Contact updated successfully:", contact)
    res.status(200).json(updatedContact);
})

//@desc DELETE request to delete a specific contact with params
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update osthe user contacts")
    }
    await Contact.deleteOne({_id:req.params.id});
    console.log("Contact deleted successfully:", contact)
    res.status(200).json(contact);
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};