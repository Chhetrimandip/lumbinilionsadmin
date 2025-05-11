import { useState } from "react";
import prisma from "@/lib/prisma";
enum PlayerClass{
  Batsman,
  WicketKeeper,
  AllRounder,
  Bowler,
}
interface LionType {
  id: string
  name:string
  slug: string
  class : PlayerClass
  description :String
  matches     :number
  strikerate  : number
  jersey : string
  wickets     : number
  runs        : number
}
export const PlayerStatsView = ({ stats = [] }: { stats: LionType[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<LionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state variables
const [formName, setFormName] = useState('');
const [formSlug, setFormSlug] = useState('');
const [formClass, setFormClass] = useState<PlayerClass>(PlayerClass.Batsman);
const [formDescription, setFormDescription] = useState('');
const [formMatches, setFormMatches] = useState(0);
const [formStrikeRate, setFormStrikeRate] = useState(0);
const [formWickets, setFormWickets] = useState(0);
const [formRuns, setFormRuns] = useState(0);
const [formJersey, setFormJersey] = useState(0);
  // Hardcoded players data

  const openEditModal = (player: LionType) => {
    setFormName(player.name);
    setFormSlug(player.slug);
    setFormClass(player.class);
    setFormDescription(player.description as string);
    setFormMatches(player.matches);
    setFormStrikeRate(player.strikerate);
    setFormWickets(player.wickets);
    setFormRuns(player.runs);
    setFormJersey(player.jersey || 0);
    
    setEditingPlayer(player);
    setShowPlayerModal(true);
  };
  
  const closeModal = () => {
    setShowPlayerModal(false);
    setEditingPlayer(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const playerData = {
      name: formName,
      slug: formSlug,
      class: formClass,
      description: formDescription,
      matches: formMatches,
      strikerate: formStrikeRate,
      wickets: formWickets,
      runs: formRuns,
      jersey: formJersey
    };
    
    try {
      // Make API call to update player
      const response = await fetch(`/api/stats/${editingPlayer?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update player stats');
      }
      
      const updatedPlayer = await response.json();
      
      // Update the player in the local state
      const updatedPlayers = players.map(player => 
        player.id === editingPlayer?.id ? updatedPlayer : player
      );
      
      // Close modal and reset state
      closeModal();
      
      // Alert user of success (you could use a toast notification instead)
      alert("Player stats updated successfully!");
      
      // This would ideally update the state, but since your component
      // receives stats as props, you might need a different approach
      // setPlayers(updatedPlayers);
      
    } catch (error) {
      console.error('Error updating player:', error);
      setError(error.message || 'Failed to update player');
    } finally {
      setLoading(false);
    }
  };

  const players = stats

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );  {/*players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );*/}

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this player?")) {
      setLoading(true);
      
      try {
        const response = await fetch(`/api/stats/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete player');
        }
        
        // Filter out the deleted player
        // This would need to be handled differently if the component receives stats as props
        alert('Player deleted successfully!');
        
      } catch (error) {
        console.error('Error deleting player:', error);
        alert('Failed to delete player');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="w-80 bg-neutral-500/25 rounded-2xl p-2">
          <input
            type="text"
            placeholder="Search players..."
            className="w-full bg-transparent outline-none text-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-neutral-500/25 rounded-2xl p-2 px-4 text-center">
          Add New Player
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className="pb-4 text-xl font-normal">Name</th>
            <th className="pb-4 text-xl font-normal">Slug</th>
            <th className="pb-4 text-xl font-normal">Jersey #</th>
            <th className="pb-4 text-xl font-normal">Class</th>
            <th className="pb-4 text-xl font-normal">Description</th>
            <th className="pb-4 text-xl font-normal">Matches</th>
            <th className="pb-4 text-xl font-normal">Strike Rate</th>
            <th className="pb-4 text-xl font-normal">Wickets</th>
            <th className="pb-4 text-xl font-normal">Runs</th>

          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <tr key={player.id} className="border-t border-gray-100">
              <td className="py-4 text-base">{player.name}</td>
              <td className="py-4 text-base">{player.slug}</td>
              <td className="py-4 text-base">{player.jersey}</td>
              <td className="py-4 text-base">{player.class}</td>
              <td className="py-4 text-base">{player.description}</td>
              <td className="py-4 text-base">{player.matches}</td>
              <td className="py-4 text-base">{player.strikerate}</td>
              <td className="py-4 text-base">{player.wickets}</td>
              <td className="py-4 text-base">{player.runs}</td>
              <td className="py-4">
                <div className="flex space-x-2">
                <button 
                  className="bg-neutral-500/25 rounded-2xl p-2 w-20 text-center"
                  onClick={() => openEditModal(player)}>
                  Edit
                </button>
                {/* Edit Player Modal */}
                {showPlayerModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full m-4">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">
                          Edit Player Stats
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
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                              id="name"
                              type="text"
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <input
                              id="slug"
                              type="text"
                              value={formSlug}
                              onChange={(e) => setFormSlug(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="playerClass" className="block text-sm font-medium text-gray-700 mb-1">Player Class</label>
                            <select
                              id="playerClass"
                              value={formClass}
                              onChange={(e) => setFormClass(parseInt(e.target.value))}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            >
                              <option value={PlayerClass.Batsman}>Batsman</option>
                              <option value={PlayerClass.WicketKeeper}>Wicket Keeper</option>
                              <option value={PlayerClass.AllRounder}>All Rounder</option>
                              <option value={PlayerClass.Bowler}>Bowler</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="jersey" className="block text-sm font-medium text-gray-700 mb-1">Jersey Number</label>
                            <input
                              id="jersey"
                              type="number"
                              min="0"
                              max="99"
                              value={formJersey}
                              onChange={(e) => setFormJersey(parseInt(e.target.value))}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            id="description"
                            rows={3}
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label htmlFor="matches" className="block text-sm font-medium text-gray-700 mb-1">Matches</label>
                            <input
                              id="matches"
                              type="number"
                              min="0"
                              value={formMatches}
                              onChange={(e) => setFormMatches(parseInt(e.target.value))}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="strikeRate" className="block text-sm font-medium text-gray-700 mb-1">Strike Rate</label>
                            <input
                              id="strikeRate"
                              type="number"
                              step="0.01"
                              min="0"
                              value={formStrikeRate}
                              onChange={(e) => setFormStrikeRate(parseFloat(e.target.value))}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="wickets" className="block text-sm font-medium text-gray-700 mb-1">Wickets</label>
                            <input
                              id="wickets"
                              type="number"
                              min="0"
                              value={formWickets}
                              onChange={(e) => setFormWickets(parseInt(e.target.value))}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="runs" className="block text-sm font-medium text-gray-700 mb-1">Runs</label>
                            <input
                              id="runs"
                              type="number"
                              min="0"
                              value={formRuns}
                              onChange={(e) => setFormRuns(parseInt(e.target.value))}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-4 mt-6">
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
                            {loading ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                  <button 
                    onClick={() => delete(player.id)}
                    className="bg-red-100 text-red-800 rounded-2xl p-2 w-20 text-center"
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
  );
};