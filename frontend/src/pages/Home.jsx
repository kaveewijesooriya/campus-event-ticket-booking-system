import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/events');
            setEvents(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleBook = async (eventId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const payload = {
                studentName: user.name,
                email: user.email,
                phone: '0000000000',
                eventId,
                packageType: 'Normal',
                quantity: 1
            };
            await axios.post('http://localhost:8000/api/bookings/create', payload, config);
            alert('Ticket booked successfully!');
            fetchEvents();
        } catch (error) {
            alert('Failed to book ticket: ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading events...</div>;

    return (
        <>
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Discover the Best Campus Events</h1>
                <p className="hero-subtitle">Book tickets for tech conferences, music festivals, and workshops happening right on your campus.</p>
                <button className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }} onClick={() => window.scrollTo({ top: document.getElementById('events').offsetTop - 80, behavior: 'smooth' })}>
                    Browse Events
                </button>
            </div>
            <div className="hero-image-container">
                <img src={theme === 'dark' ? '/hero-dark.png' : '/hero-light.png'} alt="Eventora Campus Events" className="hero-image" />
            </div>
        </div>

        <div className="container" id="events" style={{ marginTop: '3rem', marginBottom: '5rem' }}>
            <div className="page-header" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1>Upcoming Events</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Secure your spot before tickets run out.</p>
                </div>
            </div>

            {events.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <h3>No events available right now.</h3>
                    <p>Check back later!</p>
                </div>
            ) : (
                <div className="dashboard-grid">
                    {events.map((event) => (
                        <div key={event._id} className="card">
                            <h3 className="card-title">{event.title}</h3>
                            <div style={{ margin: '1rem 0', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}><strong>Date:</strong> {event.date} at {event.time}</p>
                                <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}><strong>Venue:</strong> {event.venue}</p>
                                <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '0' }}><strong>Tickets Left:</strong> {event.availableTickets}</p>
                            </div>
                            <p className="card-text">{event.description}</p>
                            
                            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--accent-color)' }}>
                                    Rs. {event.ticketPrice}
                                </span>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => handleBook(event._id)}
                                    disabled={event.availableTickets <= 0}
                                >
                                    {event.availableTickets <= 0 ? 'Sold Out' : 'Book Ticket'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
};

export default Home;
