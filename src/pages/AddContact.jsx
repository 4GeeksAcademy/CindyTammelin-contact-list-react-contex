import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useContacts from '../hooks/useContacts';

const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, addContact, editContact } = useContacts();



  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    if (id) {
      const contactToEdit = contacts.find(contact => contact.id === parseInt(id));
      if (contactToEdit) {
        setFormData({
          name: contactToEdit.name || '',
          email: contactToEdit.email || '',
          phone: contactToEdit.phone || '',
          address: contactToEdit.address || ''
        });
      }
    }
  }, [id, contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      

      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      if (id) {
        
        await editContact(parseInt(id), formData);
        alert('Contacto actualizado');
      } else {
       
        await addContact(formData);
        alert('Contacto agregado');
      }

      
      navigate('/');
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Error al guardar');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-white">
              <h2 className="mb-0">
                {id ? 'Editar Contacto' : 'Agregar nuevo contacto'}
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-bold">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="form-label fw-bold">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/')}
                    disabled={isSubmitting}
                  >
                    <i className="fas fa-arrow-left me-1"></i>
                    Regresar a contactos
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Guardando
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        {id ? 'Actualizar contacto' : 'Guardar contacto'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;