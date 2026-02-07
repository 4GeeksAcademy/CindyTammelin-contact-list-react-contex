const API_BASE_URL = "https://playground.4geeks.com/contact";

//cear agenda
export const createAgenda =async (agendaSlug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${agendaSlug}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok && response.status !==400) {
      throw new Error(`Error creando agenda: ${response.status}`);
    }


    
    return await response.json();
  } catch (error) {
    console.error("Error creando agenda:", error);
    throw error;
  }
};


export const fetchContacts =async (agendaSlug, dispatch) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  
  try {
    
    const response = await fetch(`${API_BASE_URL}/agendas/${agendaSlug}/contacts`);
    
    if (response.status === 404) {
      
      await createAgenda(agendaSlug);


      
      
      const newResponse = await fetch(`${API_BASE_URL}/agendas/${agendaSlug}/contacts`);
      
      if (newResponse.ok) {
        const data = await newResponse.json();
        dispatch({ type: 'SET_CONTACTS', payload: data.contacts || [] });
      } else {
        throw new Error(`Failed to fetch contacts: ${newResponse.status}`);
      }
    } else if (response.ok) {
      const data = await response.json();
      dispatch({ type: 'SET_CONTACTS', payload: data.contacts || [] });
    } else {
      throw new Error(`Failed to fetch contacts: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching contacts:", error);
    dispatch({ type: 'SET_ERROR', payload: error.message });
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};


export const createContact = async (agendaSlug, contactData, dispatch) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${agendaSlug}/contacts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create contact: ${response.status}`);
    }
    
    const newContact = await response.json();
    dispatch({ type: 'ADD_CONTACT', payload: newContact });
    return newContact;
  } catch (error) {
    console.error("Error creating contact:", error);
    dispatch({ type: 'SET_ERROR', payload: error.message });
    dispatch({ type: 'SET_LOADING', payload: false });
    throw error;
  }
};


export const updateContact = async (agendaSlug, contactId, contactData, dispatch) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${agendaSlug}/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update contact: ${response.status}`);
    }
    
    const updatedContact = await response.json();
    dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact });
    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error);
    dispatch({ type: 'SET_ERROR', payload: error.message });
    dispatch({ type: 'SET_LOADING', payload: false });
    throw error;
  }
};




export const deleteContact =async (agendaSlug, contactId, dispatch) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${agendaSlug}/contacts/${contactId}`, {
      method: "DELETE"
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete contact: ${response.status}`);
    }
    
    dispatch({ type: 'DELETE_CONTACT', payload: contactId });
    return true;
  } catch (error) {
    console.error("Error deleting contact:", error);
    dispatch({ type: 'SET_ERROR', payload: error.message });
    dispatch({ type: 'SET_LOADING', payload: false });
    throw error;
  }
};