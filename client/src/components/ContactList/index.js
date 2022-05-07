import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ContactItem from '../ContactItem';
import { useStoreContext } from '../../utils/GlobalState';
import { QUERY_CONTACT } from '../../utils/queries';
import { UPDATE_CONTACTS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const ContactList = () => {
    const [state, dispatch] = useStoreContext();

    // Load All Contacts from the DB
    const { loading, data } = useQuery(QUERY_CONTACT);

    // Reload Contact List Display
    useEffect(() => {
        if (data) {
          dispatch({
            type: UPDATE_CONTACTS,
            contacts: data.contacts,
          });
          data.contacts.forEach((contact) => {
            idbPromise('contacts', 'put', contact);
          });
        } else if (!loading) {
          idbPromise('contacts', 'get').then((contacts) => {
            dispatch({
              type: UPDATE_CONTACTS,
              contacts: contacts,
            });
          });
        }
      }, [data, loading, dispatch]);

    return (
        <div className="my-2 ContactDisplay">
            <h1>Contacts</h1>
            {state.contacts.length ? (
                <div className="flex-row">
                    {state.contacts.map((contact) => (
                        <ContactItem
                        key={contact._id}
                        _id={contact._id}
                        name={contact.name}
                        email={contact.email}
                        phoneNumber={contact.phoneNumber}
                        />
                    ))}
                </div>
            ) : (
                <h3>You got no friend!</h3>
            )}
        </div>
    );
};

export default ContactList;