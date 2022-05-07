const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Contact {
    _id: ID
    name: String
    email: String
    phoneNumber: String
  }

  type Query {
    contacts: [Contact]
  }

  type Mutation {
    addContact(name: String!, email: String!, phoneNumber: String!): Contact
    removeContact(email: String!): Contact
  }
`;

module.exports = typeDefs;
