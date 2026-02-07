import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <i className="fas fa-address-book me-2"></i>
          Contact Manager
        </Link>
        
        <div className="ml-auto">
          <Link to="/">
            <button className="btn btn-outline-primary me-2">
              <i className="fas fa-users me-1"></i>
              All Contacts
            </button>
          </Link>
          <Link to="/add">
            <button className="btn btn-primary">
              <i className="fas fa-plus me-1"></i>
              Add Contact
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};