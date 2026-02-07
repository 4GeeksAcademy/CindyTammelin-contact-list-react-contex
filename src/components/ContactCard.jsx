import { useState } from 'react';
import { Link } from 'react-router-dom';
import useContacts from '../hooks/useContacts';

const ContactCard = ({ contact }) =>{
  const { removeContact } = useContacts();
  const [showModal, setShowModal] = useState(false);

  

  const handleDelete = async ()=> {
    try {
      await removeContact(contact.id);
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-3 d-flex align-items-center justify-content-center p-3">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.id}`}
              className="img-fluid rounded-circle"
              alt={contact.name}
              style={{ width: '120px', height: '120px' }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title fw-bold">{contact.name}</h5>
              <p className="card-text">
                <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                {contact.address}
              </p>
              <p className="card-text">
                <i className="fas fa-phone me-2 text-muted"></i>
                {contact.phone}
              </p>
              <p className="card-text">
                <i className="fas fa-envelope me-2 text-muted"></i>
                {contact.email}
              </p>
            </div>
          </div>
          <div className="col-md-2 d-flex flex-column justify-content-center align-items-center p-3">
            <Link
              to={`/edit/${contact.id}`}
              className="btn btn-outline-primary btn-sm mb-2 w-100"
            >
              <i className="fas fa-edit me-1"></i> Edit
            </Link>
            <button
              className="btn btn-outline-danger btn-sm w-100"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-trash me-1"></i> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminacion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Desea eliminar a <strong>{contact.name}</strong>?</p>
                <p className="text-muted">esta accion no se puede regresar.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Si, Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactCard;