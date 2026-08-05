import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css';
import React from 'react';

const Layout = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <footer className="footer">
                <p>© {new Date().getFullYear()} Item Inventory</p>
            </footer>
        </div>
    );
};

export default Layout;