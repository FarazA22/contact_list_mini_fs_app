const express = require('express');
const contactController = require('../controller/ContactController');

const router = express.Router();

router.get('/initial', contactController.getContact);

router.post(
  '/addNewContact',
  contactController.newContact,
  contactController.getContact
);

router.delete(
  '/deleteContact',
  contactController.deleteContact,
  contactController.getContact
);

router.put(
  '/updateContact',
  contactController.updateContact,
  contactController.getContact
);

module.exports = router; // --> place as last line of code
