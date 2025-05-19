const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//    res.json({
//         success: true,
//         message: 'API is up and running - /api/v1/contacts',
//         method: `Method Used: ${req.method}`
//     })
// });

const {
  getAllContacts,
  getContactById,
  getUnpaginatedContacts,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactsController');

// Routes
router.get('/', getAllContacts); // /api/v1/contacts
router.get('/all', getUnpaginatedContacts); // /api/v1/contacts/all
router.get('/:id', getContactById); // /api/v1/contacts/:id
router.post('/', createContact); // /api/v1/contacts
router.put('/:id', updateContact); // /api/v1/contacts/:id
router.delete('/:id', deleteContact); // /api/v1/contacts/:id

module.exports = router;