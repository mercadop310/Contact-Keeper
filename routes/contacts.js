const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
// const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET  api/contacts
// @desc    Get all user's contacts
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    //find contact by user.id from the payload and set sort date to -1 to bring up most recent contacts first
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST  api/contacts
// @desc    Add new contact
// @access  Private

//use the check method to make sure the name is not empty
router.post(
  '/',
  [auth, [check('name', 'name is required').not().isEmpty()]],
  async (req, res) => {
    //if the name is empty, return error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructure values from req.body
    const { name, email, phone, type } = req.body;

    try {
      //create new contact instance using values from above
      //user is using the Id from the generated jwt
      //that was placed in the req object during auth middleware
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: 'Server Error' });
    }
  }
);

// @route   PUT  api/contacts/:id
// @desc    Update contact
// @access  Private

router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Build Contact Object
  //if the req.body has any of the following info,
  //enter it into the new Object to be used for update
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    //search for contact in database using id passed in params
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    //find contact in database by id, set new info in contact field or create contact if not there, and
    //send contact back
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   DELETE  api/contacts/:id
// @desc    Update contact
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    //search for contact in database using id passed in params
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
