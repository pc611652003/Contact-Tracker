import React from "react";
import { useMutation } from '@apollo/client';
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";
import { DELETE_CONTACTS } from "../../utils/actions";
import { REMOVE_CONTACT } from '../../utils/mutations';

function ContactItem(info) {
  const [state, dispatch] = useStoreContext();
  const [removeContact, { error }] = useMutation(REMOVE_CONTACT);

  const {
    _id,
    name,
    email,
    phoneNumber
  } = info;

  const DeleteContact = async () => {
    try {
      console.log('Delete ', name, "'s info!");
      const deletedContact = await removeContact({
              variables: { email: email },
            });
      dispatch({
        type: DELETE_CONTACTS,
        _id: _id
      });
      idbPromise('contacts', 'delete', { ...info });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="card px-1 py-1">
      <div>
        <h3>Name: {name}</h3>
        <h4>Email: {email}</h4>
        <h4>Phone: {phoneNumber}</h4>
      </div>
      <button onClick={DeleteContact}>Delete</button>
    </div>
  );
}

export default ContactItem;