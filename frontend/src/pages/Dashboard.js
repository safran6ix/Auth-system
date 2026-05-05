import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>

            <div className="dashboard-content">
                <div className="welcome-card">
                    <h2>Welcome, {user.name}!</h2>
                    <p>You have successfully logged in to your account.</p>
                </div>

                <div className="info-card">
                    <h3>User Information</h3>
                    <div className="info-item">
                        <strong>Name:</strong> {user.name}
                    </div>
                    <div className="info-item">
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div className="info-item">
                        <strong>Role:</strong> {user.role}
                    </div>
                    <div className="info-item">
                        <strong>User ID:</strong> {user.id}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;