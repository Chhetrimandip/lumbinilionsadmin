import React from 'react'

const editPlayerModal = () => {
    return ( 

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
                
     );
}
 
export default editPlayerModal;

