import { gql } from '@apollo/client';

export const ADD_CONTACT = gql`
  mutation addContact($name: String!, $email: String!, $phoneNumber: String!) {
    addContact(name: $name, email: $email, phoneNumber: $phoneNumber) {
      _id,
      name,
      email,
      phoneNumber
    }
  }
`;

export const REMOVE_CONTACT = gql`
  mutation removeContact($email: String!) {
    removeContact(email: $email) {
      _id,
      name,
      email,
      phoneNumber
    }
  }
`;
