import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CONTACT } from '../../utils/mutations';
import { ADD_CONTACTS } from '../../utils/actions';
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";

const InputForm = () => {
    const [state, dispatch] = useStoreContext();
    const [formState, setFormState] = useState({ name: '', email: '', phoneNumber: '' });
    const [addNewContact, { error }] = useMutation(ADD_CONTACT);

    const { contacts } = state;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const newContact = await addNewContact({
            variables: { name: formState.name, email: formState.email, phoneNumber: formState.phoneNumber },
          });
          const newContactObject = newContact.data.addContact;
          console.log('newContact: ', newContactObject);
          dispatch({
            type: ADD_CONTACTS,
            contact: newContactObject,
          });
          console.log('pass dispatch', contacts);
          state.contacts.forEach((contact) => {
            idbPromise('contacts', 'put', contact);
          });
          console.log('pass dispatch', contacts);        
        } catch (e) {
          console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    return (
        <div className="container ContactInput">
            <h2>Add Contact</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-around my-2">
                    <label htmlFor="name">Name:</label>
                    <input
                        placeholder="My Friend"
                        name="name"
                        type="name"
                        id="name"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-around my-2">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-around my-2">
                    <label htmlFor="phoneNumber">Phone #:</label>
                    <input
                        placeholder="(123)456-7890"
                        name="phoneNumber"
                        type="phoneNumber"
                        id="phoneNumber"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row flex-center">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
};

export default InputForm;