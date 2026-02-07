import { useCallback } from 'react';
import useGlobalReducer from './useGlobalReducer';
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact
} from '../actions/contacts';

export default function useContacts() {
  const { store, dispatch } = useGlobalReducer();

  const getContacts = useCallback(() => {
    return fetchContacts(store.agendaSlug, dispatch);
  }, [store.agendaSlug, dispatch]);

  const addContact = useCallback(async (contactData) => {
    return await createContact(store.agendaSlug, contactData, dispatch);
  }, [store.agendaSlug, dispatch]);

  const editContact = useCallback(async (contactId, contactData) => {
    return await updateContact(store.agendaSlug, contactId, contactData, dispatch);
  }, [store.agendaSlug, dispatch]);

  const removeContact = useCallback(async (contactId) => {
    return await deleteContact(store.agendaSlug, contactId, dispatch);
  }, [store.agendaSlug, dispatch]);

  return {
    contacts: store.contacts,
    loading: store.loading,
    error: store.error,
    getContacts,
    addContact,
    editContact,
    removeContact
  };
}