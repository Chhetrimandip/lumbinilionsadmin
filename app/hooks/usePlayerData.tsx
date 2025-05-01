// app/components/usePlayerData.tsx
"use client"
import { useState, useEffect } from 'react';

export function usePlayerData() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch('/api/players');
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPlayers();
  }, []);
  
  return { players, loading, error };
}