"use client";

import React from 'react'
import Navbar from './component/Navbar';
import Dashboard from './component/dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const AdminPage = () => {
    return (
        <ProtectedRoute>
            <div>
                <Navbar />
                <Dashboard />
            </div>
        </ProtectedRoute>
    );
}
 
export default AdminPage;