const {
  ContactModel,
  Pager,
  sortContacts,
  filterContacts,
  ContactNotFoundError,
//   ContactResourceError,
//   ApiError
} = require('@jworkman-fs/asl');
// https://wdv442-http-docs.jworkman.dev/
let contacts = ContactModel.index();

const getAllContacts = (req, res) => { // ?page=2&sort=name for the query params  /
  try {
    // let result = [...contacts] // use spread operator to clone the array from the ContactModel model from the jworkman npm packagee.
    contacts = filterContacts(contacts, req.query);
    contacts = sortContacts(contacts, req.query);
    // const filtered = Contact.filter( contacts, req.get('X-Filter-By'), req.get('X-Filter-Value') )
    // const sorted = sortContacts( contacts, req.query.sort, req.query.direction )
    const page = req.query.page || 1; // if not defined, make it 1
    // const pager = new Pager(result, parseInt(page), 10);
    const pager = new Pager( contacts, page, req.query.size )
    // res.set("X-Page-Total", pager.total())
    // res.set("X-Page-Next", pager.next())
    // res.set("X-Page-Prev", pager.prev())
    // res.json(pager.results())

    res.status(200).json({ // success - 200
      success: true,
      page: pager.page,
    //   totalPages: pager.totalPages,
      results: pager.results()
    });
  } catch (err) {
    console.error(err, 'Failed to get contacts')
    res.status(500).json({ // internal server error - 500
      success: false,
      message: 'Failed to get contacts',
      error: err.message
    });
  }
};

const getUnpaginatedContacts = (req, res) => { // all
  try {
    // const contacts = ContactModel.index();

    res.status(200).json({ // success - 200
      success: true,
      message: contacts
    });
  } catch (err) {
    res.status(500).json({ // internal server error - 500
      success: false,
      message: 'Failed to get contacts',
      error: err.message
    });
  }
};

const getContactById = (req, res) => {
  try {
    // const contacts = ContactModel.index();
    const contactId = req.params.id;

    const findContact = contacts.find((contact) => contact.id === parseInt(contactId)); // had to add parseInt, was returning a string as the param instead of number type

    if (!findContact) {
      throw new ContactNotFoundError(`Contact with ID ${contactId} not found.`);
    }

    res.status(200).json({
      success: true,
      contact: findContact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get contact'
    });
  }
};

const createContact = (req, res) => { // post :id
  try {
    // const contacts = ContactModel.index();
    const newContact = req.body;

    const newId = (contacts.length + 1); // make new id from the len of the array or amount of contacts and then add + 1. 
    newContact.id = newId; // add the id

    contacts.push(newContact); // push to end of array, with the req body

    res.status(201).json({ // 201 - success AND new resource has been created
      success: true,
      message: newContact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create contact',
      error: err.message
    });
  }
};

const updateContact = (req, res) => { // put 
  try {
    // const contacts = ContactModel.index();
    const contactId = req.params.id; // get id

    const index = contacts.findIndex((contact) => contact.id === parseInt(contactId)); // find id that matches the id of param

    // if (!index) { // did not find ID
    //   throw new ContactNotFoundError(`Contact with ID ${contactId} not found.`);
    // }
    if (index === -1) { // did not find ID
      throw new ContactNotFoundError(`Contact with ID ${contactId} not found.`);
    }

    const updatedContact = { // store the data from the body request
      ...contacts[index], // copy data at the given index that was found.
      ...req.body // override the copied data
    };

    contacts[index] = updatedContact; // update

    res.status(200).json({
      success: true,
      message: updatedContact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to update contact: ${err.message}`
    });
  }
};

const deleteContact = (req, res) => { // delete :id
  try {
    // const contacts = ContactModel.index();
    const contactId = req.params.id;

    const index = contacts.findIndex((contact) => contact.id === parseInt(contactId)); // find id

    if (index === -1) { // did not find ID
      throw new ContactNotFoundError(`Contact with ID ${contactId} not found.`);
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    contacts.splice(index, 1);

    res.status(200).json({
      success: true,
      message: `Deleted the contact with ID: ${contactId}`
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to delete contact: ${err.message}`
    });
  }
};

// exports
module.exports = {
  getAllContacts,
  getUnpaginatedContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};