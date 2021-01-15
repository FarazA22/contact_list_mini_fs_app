const Contact = require('../model/ContactModel');

const contactController = {};

contactController.getContact = function getCompleteContactListFromDB(
  req,
  res,
  next
) {
  Contact.find({})
    .then((data) => res.status(200).json(data))
    .catch((error) => next(error));
};

contactController.newContact = function addNewContactToContactCollection(
  req,
  res,
  next
) {
  const { name, email, number } = req.body;
  Contact.create({ name, email, number }, (err, data) => {
    if (err) next(err);
    next();
  });
};

contactController.deleteContact = function deleteContactFromContactCollectionBasedOnDocIDInDatabase(
  req,
  res,
  next
) {
  const { _id: docIdInContactCollection } = req.body;
  console.log(req.body);
  Contact.deleteOne({ _id: docIdInContactCollection }, (err, data) => {
    if (err) next(err);
    next();
  });
};

contactController.updateContact = function updateContactFromContactCollectionBasedOnDocID(
  req,
  res,
  next
) {
  const { _id: docIdInContactCollection, name, email, number } = req.body;
  Contact.updateOne(
    { _id: docIdInContactCollection },
    {
      name,
      email,
      number,
    }
  )
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = contactController;
