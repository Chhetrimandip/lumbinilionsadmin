"use client"

import { useState, useEffect } from "react"
import { format } from 'date-fns';

interface Schedule {
  id: string;
  opponent: string;
  opponentLogo?: string;
  matchDate: string | Date;
  venue?: string;
  matchType?: string;
  isCompleted: boolean;
  victory?: boolean;
  lionsRuns?: number;
  lionsWickets?: number;
  lionsOvers?: number;
  opponentRuns?: number;
  opponentWickets?: number;
  opponentOvers?: number;
  margin?: number;
  marginType?: string;
  ballsLeft?: number;
  description?: string;
  highlightUrl?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export const ScheduleResultsView = ({ schedule = [] }: { schedule?: Schedule[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchData, setMatchData] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Schedule | null>(null);
  
  // Form state
  const [formOpponent, setFormOpponent] = useState('');
  const [formMatchDate, setFormMatchDate] = useState('');
  const [formVenue, setFormVenue] = useState('');
  const [formMatchType, setFormMatchType] = useState('');
  const [formIsCompleted, setFormIsCompleted] = useState(false);
  const [formVictory, setFormVictory] = useState<boolean | undefined>(undefined);
  const [formLionsRuns, setFormLionsRuns] = useState<number | undefined>(undefined);
  const [formLionsWickets, setFormLionsWickets] = useState<number | undefined>(undefined);
  const [formLionsOvers, setFormLionsOvers] = useState<number | undefined>(undefined);
  const [formOpponentRuns, setFormOpponentRuns] = useState<number | undefined>(undefined);
  const [formOpponentWickets, setFormOpponentWickets] = useState<number | undefined>(undefined);
  const [formOpponentOvers, setFormOpponentOvers] = useState<number | undefined>(undefined);
  const [formDescription, setFormDescription] = useState('');
  const [formHighlightUrl, setFormHighlightUrl] = useState('');
  
  // Fetch schedule data if not provided as props
  useEffect(() => {
    if (schedule.length > 0) {
      setMatchData(schedule);
    } else {
      fetchSchedule();
    }
  }, [schedule]);

  const fetchSchedule = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/schedule');
      if (!response.ok) {
        throw new Error('Failed to fetch schedule');
      }
      
      const data = await response.json();
      setMatchData(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setError('Failed to load schedule. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches = matchData.filter(match => 
    match.opponent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (match.venue && match.venue.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (match.matchType && match.matchType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort matches: Upcoming first (if not completed), then by date (newest first)
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) return 1;
    if (!a.isCompleted && b.isCompleted) return -1;
    return new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime();
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this match?")) {
      setLoading(true);
      
      try {
        const response = await fetch(`/api/schedule/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete match');
        }
        
        // Remove the deleted match from state
        setMatchData(prevMatches => prevMatches.filter(match => match.id !== id));
      } catch (error) {
        console.error('Error deleting match:', error);
        setError('Failed to delete match. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const openAddModal = () => {
    // Reset form fields
    setFormOpponent('');
    setFormMatchDate('');
    setFormVenue('');
    setFormMatchType('');
    setFormIsCompleted(false);
    setFormVictory(undefined);
    setFormLionsRuns(undefined);
    setFormLionsWickets(undefined);
    setFormLionsOvers(undefined);
    setFormOpponentRuns(undefined);
    setFormOpponentWickets(undefined);
    setFormOpponentOvers(undefined);
    setFormDescription('');
    setFormHighlightUrl('');
    
    setEditingMatch(null);
    setShowAddModal(true);
  };

  const openEditModal = (match: Schedule) => {
    // Set form fields with match data
    setFormOpponent(match.opponent);
    setFormMatchDate(formatDateForInput(match.matchDate));
    setFormVenue(match.venue || '');
    setFormMatchType(match.matchType || '');
    setFormIsCompleted(match.isCompleted);
    setFormVictory(match.victory);
    setFormLionsRuns(match.lionsRuns);
    setFormLionsWickets(match.lionsWickets);
    setFormLionsOvers(match.lionsOvers);
    setFormOpponentRuns(match.opponentRuns);
    setFormOpponentWickets(match.opponentWickets);
    setFormOpponentOvers(match.opponentOvers);
    setFormDescription(match.description || '');
    setFormHighlightUrl(match.highlightUrl || '');
    
    setEditingMatch(match);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingMatch(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const teamSlug = formOpponent.toLowerCase().split(' ')[0];
    const logoUrl = `/${teamSlug}.png`;
    const matchData = {
      opponent: formOpponent,
      opponentLogo: logoUrl, // Add this field to form if needed
      matchDate: formMatchDate,
      venue: formVenue,
      matchType: formMatchType,
      isCompleted: formIsCompleted,
      victory: formIsCompleted ? formVictory : undefined,
      lionsRuns: formIsCompleted ? formLionsRuns : undefined,
      lionsWickets: formIsCompleted ? formLionsWickets : undefined,
      lionsOvers: formIsCompleted ? formLionsOvers : undefined,
      opponentRuns: formIsCompleted ? formOpponentRuns : undefined,
      opponentWickets: formIsCompleted ? formOpponentWickets : undefined,
      opponentOvers: formIsCompleted ? formOpponentOvers : undefined,
      description: formDescription,
      highlightUrl: formHighlightUrl,
    };
    
    try {
      if (editingMatch) {
        // Update existing match
        const response = await fetch(`/api/schedule/${editingMatch.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(matchData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update match');
        }
        
        const updatedMatch = await response.json();
        
        // Update matches state
        setMatchData(prevMatches => 
          prevMatches.map(match => match.id === editingMatch.id ? updatedMatch : match)
        );
      } else {
        // Add new match
        const response = await fetch('/api/schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(matchData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to add match');
        }
        
        const newMatch = await response.json();
        
        // Add new match to state
        setMatchData(prevMatches => [...prevMatches, newMatch]);
      }
      
      // Close modal after successful submission
      closeModal();
    } catch (error) {
      console.error('Error saving match:', error);
      setError('Failed to save match. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format date string to YYYY-MM-DDThh:mm for datetime-local input
  const formatDateForInput = (dateString: string | Date) => {
    try {
      return new Date(dateString).toISOString().slice(0, 16);
    } catch (e) {
      return '';
    }
  };

  // Format match result for display
  const formatMatchResult = (match: Schedule) => {
    if (!match.isCompleted) return 'Upcoming';
    
    const lionsScore = `${match.lionsRuns || 0}/${match.lionsWickets || 0} (${match.lionsOvers || 0})`;
    const opponentScore = `${match.opponentRuns || 0}/${match.opponentWickets || 0} (${match.opponentOvers || 0})`;
    
    return match.victory 
      ? `Won: LUM ${lionsScore} vs ${match.opponent} ${opponentScore}` 
      : `Lost: LUM ${lionsScore} vs ${match.opponent} ${opponentScore}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="w-80 bg-neutral-500/25 rounded-2xl p-2">
          <input
            type="text"
            placeholder="Search schedule..."
            className="w-full bg-transparent outline-none text-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          className="bg-neutral-500/25 rounded-2xl p-2 px-4 text-center"
          onClick={openAddModal}
        >
          Add New Match
        </button>
      </div>

      {loading && !showAddModal ? (
        <div className="text-center py-8">Loading schedule data...</div>
      ) : error && !showAddModal ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="pb-4 text-xl font-normal">Date</th>
              <th className="pb-4 text-xl font-normal">Opponent</th>
              <th className="pb-4 text-xl font-normal">Venue</th>
              <th className="pb-4 text-xl font-normal">Type</th>
              <th className="pb-4 text-xl font-normal">Result</th>
              <th className="pb-4 text-xl font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedMatches.length > 0 ? (
              sortedMatches.map((match) => (
                <tr key={match.id} className="border-t border-gray-100">
                  <td className="py-4 text-base">{format(new Date(match.matchDate), 'MMM dd, yyyy h:mm a')}</td>
                  <td className="py-4 text-base">{match.opponent}</td>
                  <td className="py-4 text-base">{match.venue || '-'}</td>
                  <td className="py-4 text-base">{match.matchType || '-'}</td>
                  <td className="py-4 text-base">
                    <span className={match.isCompleted 
                      ? (match.victory ? 'text-green-600' : 'text-red-600')
                      : 'text-blue-600'
                    }>
                      {formatMatchResult(match)}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button 
                        className="bg-neutral-500/25 rounded-2xl p-2 w-20 text-center"
                        onClick={() => openEditModal(match)}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(match.id)}
                        className="bg-red-100 text-red-800 rounded-2xl p-2 w-20 text-center"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No matches found. Please add some matches to the schedule.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Add/Edit Match Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingMatch ? 'Edit Match' : 'Add New Match'}
              </h2>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic match details */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Match Details</h3>
                  
                  <div className="space-y-4">
                  <div>
                    <label htmlFor="opponent" className="block text-sm font-medium text-gray-700 mb-1">Opponent Team*</label>
                    <select
                      id="opponent"
                      value={formOpponent}
                      onChange={(e) => {
                        setFormOpponent(e.target.value);
                        // Automatically set the logo based on the team name
                        const teamSlug = e.target.value.toLowerCase().split(' ')[0];
                        const logoUrl = `/${teamSlug}.png`;
                        // You might need to add state for logo if you want to track it separately
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Opponent Team</option>
                      <option value="Biratnagar Kings">Biratnagar Kings</option>
                      <option value="Chitwan Rhinos">Chitwan Rhinos</option>
                      <option value="Janakpur Bolts">Janakpur Bolts</option>
                      <option value="Karnali Yaks">Karnali Yaks</option>
                      <option value="Kathmandu Gurkhas">Kathmandu Gurkhas</option>
                      <option value="Pokhara Avengers">Pokhara Avengers</option>
                      <option value="Sudurpaschim Royals">Sudurpaschim Royals</option>
                    </select>
                  </div>
                    
                    <div>
                      <label htmlFor="matchDate" className="block text-sm font-medium text-gray-700 mb-1">Match Date & Time*</label>
                      <input
                        id="matchDate"
                        type="datetime-local"
                        value={formMatchDate}
                        onChange={(e) => setFormMatchDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                      <input
                        id="venue"
                        type="text"
                        value={formVenue}
                        onChange={(e) => setFormVenue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="matchType" className="block text-sm font-medium text-gray-700 mb-1">Match Type</label>
                      <select
                        id="matchType"
                        value={formMatchType}
                        onChange={(e) => setFormMatchType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Match Type</option>
                        <option value="T20">T20</option>
                        <option value="ODI">ODI</option>
                        <option value="Test">Test</option>
                        <option value="Friendly">Friendly</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="isCompleted"
                        type="checkbox"
                        checked={formIsCompleted}
                        onChange={(e) => setFormIsCompleted(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isCompleted" className="ml-2 block text-sm text-gray-900">
                        Match Completed
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Match result (only if isCompleted is checked) */}
                <div className={`${!formIsCompleted ? 'opacity-50 pointer-events-none' : ''}`}>
                  <h3 className="text-lg font-medium mb-4">Match Result</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-gray-700">Result:</label>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="victory"
                            checked={formVictory === true}
                            onChange={() => setFormVictory(true)}
                            disabled={!formIsCompleted}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">Won</span>
                        </label>
                        
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="victory"
                            checked={formVictory === false}
                            onChange={() => setFormVictory(false)}
                            disabled={!formIsCompleted}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">Lost</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lions Score</label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label htmlFor="lionsRuns" className="block text-xs text-gray-500 mb-1">Runs</label>
                          <input
                            id="lionsRuns"
                            type="number"
                            min="0"
                            value={formLionsRuns === undefined ? '' : formLionsRuns}
                            onChange={(e) => setFormLionsRuns(e.target.value ? parseInt(e.target.value) : undefined)}
                            disabled={!formIsCompleted}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="lionsWickets" className="block text-xs text-gray-500 mb-1">Wickets</label>
                          <input
                            id="lionsWickets"
                            type="number"
                            min="0"
                            max="10"
                            value={formLionsWickets === undefined ? '' : formLionsWickets}
                            onChange={(e) => setFormLionsWickets(e.target.value ? parseInt(e.target.value) : undefined)}
                            disabled={!formIsCompleted}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="lionsOvers" className="block text-xs text-gray-500 mb-1">Overs</label>
                          <input
                            id="lionsOvers"
                            type="number"
                            step="0.1"
                            min="0"
                            value={formLionsOvers === undefined ? '' : formLionsOvers}
                            onChange={(e) => setFormLionsOvers(e.target.value ? parseFloat(e.target.value) : undefined)}
                            disabled={!formIsCompleted}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Opponent Score</label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label htmlFor="opponentRuns" className="block text-xs text-gray-500 mb-1">Runs</label>
                          <input
                            id="opponentRuns"
                            type="number"
                            min="0"
                            value={formOpponentRuns === undefined ? '' : formOpponentRuns}
                            onChange={(e) => setFormOpponentRuns(e.target.value ? parseInt(e.target.value) : undefined)}
                            disabled={!formIsCompleted}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="opponentWickets" className="block text-xs text-gray-500 mb-1">Wickets</label>
                          <input
                            id="opponentWickets"
                            type="number"
                            min="0"
                            max="10"
                            value={formOpponentWickets === undefined ? '' : formOpponentWickets}
                            onChange={(e) => setFormOpponentWickets(e.target.value ? parseInt(e.target.value) : undefined)}
                            disabled={!formIsCompleted}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="opponentOvers" className="block text-xs text-gray-500 mb-1">Overs</label>
                          <input
                            id="opponentOvers"
                            type="number"
                            step="0.1"
                            min="0"
                            value={formOpponentOvers === undefined ? '' : formOpponentOvers}
                            onChange={(e) => setFormOpponentOvers(e.target.value ? parseFloat(e.target.value) : undefined)}
                            disabled={!formIsCompleted}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional fields */}
              <div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Match Description</label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add match details or summary..."
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="highlightUrl" className="block text-sm font-medium text-gray-700 mb-1">Highlight Video URL</label>
                  <input
                    id="highlightUrl"
                    type="url"
                    value={formHighlightUrl}
                    onChange={(e) => setFormHighlightUrl(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : editingMatch ? 'Update Match' : 'Add Match'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};