export const initialStore = () => {
  return {
    contacts: [], 
    loading: false,
    error: null,
    agendaSlug: "4geeks-user" 
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'SET_LOADING':
      return {
        ...store,
        loading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...store,
        error: action.payload
      };
    
    case 'SET_CONTACTS':
      return {
        ...store,
        contacts: action.payload,
        loading: false,
        error: null
      };
    
    case 'ADD_CONTACT':
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
        loading: false,
        error: null
      };
    
    case 'UPDATE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false,
        error: null
      };
    
    case 'DELETE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.filter(contact => 
          contact.id !== action.payload
        ),
        loading: false,
        error: null
      };
    
    default:
      return store;
  }    
}