const { Contact } = require('../Models');

const ContactController = {
  async addContact(req, res) {
    try {
      const { userId, name, phoneNumber } = req.body;
      const contact = await Contact.create({ userId, name, phoneNumber });
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getContacts(req, res) {
    try {
      const userId = req.params.userId;
      const contacts = await Contact.findAll({ where: { userId } });
      res.json(contacts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = ContactController;
