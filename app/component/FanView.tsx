import { downloadcsv } from '@/lib/utils';
import React, { useState, useEffect, useCallback } from 'react';

interface Fan {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  time: number;
}

export const FanView = ({fansdata = []}: {fansdata?: Fan[]}) => {
  const [fans, setFans] = useState<Fan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFan, setEditingFan] = useState<Fan | null>(null);
  
  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTime, setFormTime] = useState(0);
  const [formScore, setFormScore] = useState(0);

  // Debounce search term to improve performance
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Update fans state when fansdata prop changes
  useEffect(() => {
    if (fansdata && fansdata.length > 0) {
      setFans(fansdata);
    } else {
      setFans([]);
    }
  }, [fansdata]);
  
  // Enhanced filtering logic to include all fields
  const filteredFans = fans.filter(fan => {
    const search = debouncedSearchTerm.toLowerCase();
    return (
      (fan.name && fan.name.toLowerCase().includes(search)) ||
      (fan.email && fan.email.toLowerCase().includes(search)) ||
      (fan.phone && fan.phone.includes(debouncedSearchTerm)) ||
      (fan.score !== undefined && fan.score.toString().includes(debouncedSearchTerm)) ||
      (fan.time !== undefined && fan.time.toString().includes(debouncedSearchTerm))
    );
  });
  
  // Handle fan deletion with confirmation
  const handleDelete = useCallback(async (id: string) => {
    if(confirm("Are you sure you want to delete this fan?")) {
      try {
        const response = await fetch(`/api/fan/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete fan');
        }
        
        // Only update UI if delete was successful
        setFans(prevFans => prevFans.filter(fan => fan.id !== id));
      } catch(error) {
        console.error("Error deleting fan:", error);
        alert("Couldn't delete fan. Please try again later.");
      }
    }
  }, []);
  
  // Reset form and open modal for adding new fan
  const openAddModal = useCallback(() => {
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormTime(0);
    setFormScore(0);
    setEditingFan(null);
    setShowAddModal(true);
  }, []);
  
  // Pre-fill form and open modal for editing existing fan
  const openEditModal = useCallback((fan: Fan) => {
    setFormName(fan.name || '');
    setFormEmail(fan.email || '');
    setFormPhone(fan.phone || '');
    setFormTime(fan.time || 0);
    setFormScore(fan.score || 0);
    setEditingFan(fan);
    setShowAddModal(true);
  }, []);
  
  // Close modal and reset editing state
  const closeModal = useCallback(() => {
    setShowAddModal(false);
    setEditingFan(null);
  }, []);
  
  // Handle form submission for both adding and editing fans
// Handle form submission for both adding and editing fans
const handleSubmit = useCallback(async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (editingFan) {
    // Update existing fan
    const updatedFan = {
      ...editingFan,
      name: formName,
      email: formEmail,
      phone: formPhone,
      score: formScore,
      time: formTime,
    };
    
    try {
      const response = await fetch(`/api/fan/${editingFan.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFan)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update the fan");
      }
      
      // Only update UI if update was successful
      setFans(prevFans => prevFans.map(fan => fan.id === editingFan.id ? updatedFan : fan));
    } catch(error) {
      console.error('Error updating the fan data:', error);
      alert(`Failed to update the fan data: ${error.message}`);
    }
  } else {
    // Add new fan
    const newFan = {
      id: Math.random().toString(36).substring(2, 9), // Simple ID generation for demo
      name: formName,
      email: formEmail,
      phone: formPhone,
      score: formScore,
      time: formTime,
    };
    
    // Here you could add a try/catch block to handle API calls for creating a new fan
    // similar to the update logic above
    
    setFans(prevFans => [...prevFans, newFan]);
  }
  
  closeModal();
}, [formName, formEmail, formPhone, formScore, formTime, editingFan, closeModal]);
  
  // Handle CSV download with error handling
  const handleDownload = useCallback((fansData: Fan[]) => {
    try {
      downloadcsv(fansData);
    } catch(error) {
      console.error("CSV download error:", error);
      alert("Couldn't download CSV file. Please try again later.");
    }
  }, []);
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search fans..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search fans"
          />
          <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="space-x-3">
          <button 
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            aria-label="Add new fan"
          >
            Add Fan
          </button>
          
          <button 
            onClick={() => handleDownload(fans)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
            aria-label="Download CSV"
            disabled={fans.length === 0}
          >
            Download CSV
          </button>
        </div>
      </div>
      
      {fans.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Phone</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Score</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFans.map((fan) => (
                <tr key={fan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-100">{fan.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-100">{fan.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-100">{fan.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-100">{fan.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-100">{fan.score}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-100">{fan.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(fan)}
                        className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                        aria-label={`Edit fan ${fan.name}`}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(fan.id)}
                        className="px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                        aria-label={`Delete fan ${fan.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900">No fans found</h3>
          <p className="mt-1 text-gray-500">There are no fans in the database yet.</p>
        </div>
      )}
      
      {fans.length > 0 && filteredFans.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900">No matching fans</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}
      
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingFan ? 'Edit Fan' : 'Add New Fan'}
              </h2>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fanName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="fanName"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="fanEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="fanEmail"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="fanPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  id="fanPhone"
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="fanScore" className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                <input
                  id="fanScore"
                  type="number"
                  min="0"
                  value={formScore}
                  onChange={(e) => setFormScore(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="fanTime" className="block text-sm font-medium text-gray-700 mb-1">Time (seconds)</label>
                <input
                  id="fanTime"
                  type="number"
                  min="0"
                  value={formTime}
                  onChange={(e) => setFormTime(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                >
                  {editingFan ? 'Save Changes' : 'Add Fan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};