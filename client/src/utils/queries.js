import { gql } from '@apollo/client';

export const QUERY_CONTACT = gql`
  query contacts {
    contacts {
      _id,
      name,
      email,
      phoneNumber
    }
  }
`;
