import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Import from the Firebase auth context
import './Navbar.css'; // We'll create this CSS file later if needed

export default function Navbar() {
  const { user, logout } = useAuthContext();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Hooshjoo</h1>
        </Link>
        <ul className="nav-links">
          {user ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/create">Create Project</Link>
              </li>
              <li>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

