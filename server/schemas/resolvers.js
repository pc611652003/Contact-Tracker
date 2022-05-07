const { AuthenticationError } = require('apollo-server-express');
const { Contact } = require('../models');

const resolvers = {
  Query: {
    contacts: async () => {
      return await Contact.find();
    }
  },

  Mutation: {
    addContact: async (parent, { name, email, phoneNumber }) => {
      const contact = await Contact.create({ name, email, phoneNumber });

      return contact;
    },

    removeContact: async (parent, { email }) => {
      const removedContact = await Contact.findOneAndDelete({ email: email });

      return removedContact;
    },
  }
};

module.exports = resolvers;
