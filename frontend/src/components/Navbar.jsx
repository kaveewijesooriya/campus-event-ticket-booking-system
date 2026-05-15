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
                <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--primary-color)" />
                                <stop offset="100%" stopColor="var(--secondary-color)" />
                            </linearGradient>
                        </defs>
                        <path d="M4 7v3.882c0 .415.353.75.794.75h.059c1.076 0 1.947.882 1.947 1.968 0 1.085-.871 1.968-1.947 1.968h-.059c-.441 0-.794.335-.794.75V20c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2v-3.682c0-.415-.353-.75-.794-.75h-.059c-1.076 0-1.947-.882-1.947-1.968 0-1.085.871-1.968 1.947-1.968h.059c.441 0 .794-.335.794-.75V7c0-1.105-.895-2-2-2H6c-1.105 0-2 .895-2 2Z"/>
                        <path d="M10 9h4"/>
                        <path d="M10 13h4"/>
                        <path d="M10 17h4"/>
                    </svg>
                    <span>Event<span style={{ color: 'var(--accent-color)', WebkitTextFillColor: 'var(--accent-color)' }}>ora</span></span>
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
