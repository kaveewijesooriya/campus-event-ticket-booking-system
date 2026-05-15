import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { ThemeContext } from '../ThemeContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    Event<span>ora</span>
                </Link>
                <div className="nav-links">
                    <button onClick={toggleTheme} className="theme-toggle" title="Toggle Theme">
                        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </button>
                    <Link to="/" className="nav-link">Home</Link>
                    {user ? (
                        <>
                            {user.role === 'organizer' && (
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            )}
                            <span className="nav-link" style={{ color: 'var(--primary-color)' }}>
                                Hi, {user.name}
                            </span>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.25rem 1rem' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
