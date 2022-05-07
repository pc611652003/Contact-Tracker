import { useReducer } from "react";
import {
  UPDATE_CONTACTS,
  ADD_CONTACTS,
  DELETE_CONTACTS,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CONTACTS:
      return {
        contacts: [...action.contacts],
      };

    case ADD_CONTACTS:
      console.log(state.contacts);
      console.log('Why? ', [...state.contacts, action.contact]);
      return {
        contacts: [...state.contacts, action.contact],
      };

    case DELETE_CONTACTS:
      let newList = state.contacts.filter(contact => {
        return contact._id !== action._id;
      });

      return {
        contacts: newList,
      };

    default:
      return state;
  }
};

export function useContactReducer(initialState) {
  return useReducer(reducer, initialState)
}