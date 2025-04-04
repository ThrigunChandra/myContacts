const express = require("express");
const validateToken = require("../middleware/validateTokenHandler")
// This is a method which helps to mount all our route 
// Uses - 
//        Improves code readability and maintainability, 
//        Its is easier to scale (add more routes without cluttering server.js)
//        Encourages separation of concerns (API routes are separate from app setup)

// Create a router to help routing
const router = express.Router();

// Controllers or what it should after getting those requests
const {
    getContacts,
    createContact,
    getContact, 
    updateContact, 
    deleteContact
} = require("../controllers/contactController")

router.use(validateToken)

// https:/localhost:3001/api/contacts/
router.route('/').get(getContacts).post(createContact)

// https:/localhost:3001/api/contacts/:id
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;