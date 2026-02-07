import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from '../components/ContactCard';
import useContacts from '../hooks/useContacts';

const Contacts = () => {
  const { contacts, loading, error, getContacts } = useContacts();

  useEffect(() => {
    getContacts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Cargando contactos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={getContacts}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Contactos</h1>
        <Link to="/add" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>
          Agrega nuevo contacto
        </Link>
      </div>

      {contacts.length === 0 ? (
        <div className="card text-center p-5">
          <div className="card-body">
            <h5 className="card-title">No existe</h5>
            <p className="card-text">Agrega tu primer contacto</p>
            <Link to="/add" className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>
              Agregar contactos
            </Link>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8 mx-auto">
            {contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;