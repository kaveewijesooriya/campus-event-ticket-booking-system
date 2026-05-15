import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const OrganizerDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [events, setEvents] = useState([]);
    
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [venue, setVenue] = useState('');
    const [category, setCategory] = useState('Music');
    const [ticketPrice, setTicketPrice] = useState('');
    const [vipPrice, setVipPrice] = useState('');
    const [availableTickets, setAvailableTickets] = useState('');
    const [description, setDescription] = useState('');
    
    useEffect(() => {
        if (!user) navigate('/login');
        else if (user.role !== 'organizer') navigate('/');
    }, [user, navigate]);

    const fetchMyEvents = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/events');
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        if (user && user.role === 'organizer') fetchMyEvents();
    }, [user]);

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:8000/api/events/create', {
                title, date, time, venue, category, ticketPrice: Number(ticketPrice), vipPrice: Number(vipPrice), availableTickets: Number(availableTickets), description
            }, config);
            
            alert('Event created successfully!');
            setTitle(''); setDate(''); setTime(''); setVenue(''); setTicketPrice(''); setVipPrice(''); setAvailableTickets(''); setDescription('');
            fetchMyEvents();
        } catch (error) {
            alert('Failed to create event: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:8000/api/events/delete/${id}`, config);
                alert('Event deleted successfully');
                fetchMyEvents();
            } catch (error) {
                alert('Failed to delete event');
            }
        }
    };

    if (!user || user.role !== 'organizer') return null;

    return (
        <div className="container" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
            <div className="page-header">
                <div>
                    <h1>Organizer Dashboard</h1>
                    <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Manage your events and create new ones.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2.5rem' }}>
                <div className="card">
                    <h3 className="card-title">Create New Event</h3>
                    <form onSubmit={handleCreateEvent} style={{ marginTop: '1.5rem' }}>
                        <div className="form-group"><label className="form-label">Event Title</label><input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1 }}><label className="form-label">Date</label><input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required /></div>
                            <div className="form-group" style={{ flex: 1 }}><label className="form-label">Time</label><input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required /></div>
                        </div>
                        <div className="form-group"><label className="form-label">Venue</label><input type="text" className="form-control" value={venue} onChange={(e) => setVenue(e.target.value)} required /></div>
                        <div className="form-group"><label className="form-label">Category</label><input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required /></div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1 }}><label className="form-label">Ticket Price (Rs.)</label><input type="number" className="form-control" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} required /></div>
                            <div className="form-group" style={{ flex: 1 }}><label className="form-label">VIP Price (Rs.)</label><input type="number" className="form-control" value={vipPrice} onChange={(e) => setVipPrice(e.target.value)} required /></div>
                        </div>
                        <div className="form-group"><label className="form-label">Available Tickets</label><input type="number" className="form-control" value={availableTickets} onChange={(e) => setAvailableTickets(e.target.value)} required /></div>
                        <div className="form-group"><label className="form-label">Description</label><textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea></div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Event</button>
                    </form>
                </div>

                <div>
                    <h3 style={{ marginBottom: '1rem' }}>All Events</h3>
                    {events.length === 0 ? <p>No events found.</p> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {events.map((event) => (
                                <div key={event._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem', fontSize: '1.25rem' }}>{event.title}</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                            {event.date} at {event.time} | {event.venue}
                                        </p>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: '600', marginTop: '0.5rem' }}>
                                            Rs. {event.ticketPrice} (Normal) / Rs. {event.vipPrice} (VIP)
                                        </p>
                                    </div>
                                    <button className="btn btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={() => handleDelete(event._id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;
