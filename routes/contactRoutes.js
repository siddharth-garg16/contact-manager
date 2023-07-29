const express = require('express');

const {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact
} = require("../controllers/contactController");
const { validateToken } = require('../middlewares/validateTokenHandler');

const router = express.Router();

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);;
router.route("/:id").get(getContact).delete(deleteContact).put(updateContact);


module.exports = router;