"use client";
import React, { useState, useEffect } from "react";

interface LeagueTeam {
  id: string;
  name: string;
  played: number;
  won: number;
  lost: number;
  nr: number;
  points: number;
  pos: number;
}

interface LeagueViewProps {
  league?: LeagueTeam[];
}

export const LeagueView = ({ league = [] }: LeagueViewProps) => {
  const [teams, setTeams] = useState<LeagueTeam[]>(league);
  const [editingCell, setEditingCell] = useState<{
    teamId: string;
    field: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Update teams when league prop changes
  useEffect(() => {
    if (league?.length > 0) {
      setTeams(league);
    }
  }, [league]);

  const handleCellClick = (teamId: string, field: string) => {
    // Don't allow editing the name field directly for simplicity
    if (field !== "name") {
      setEditingCell({ teamId, field });
    }
  };

  const handleCellChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    teamId: string,
    field: string
  ) => {
    // Only allow numbers for numeric fields
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;

    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        return { ...team, [field]: value };
      }
      return team;
    });

    setTeams(updatedTeams);
  };

  const handleCellBlur = async (teamId: string, field: string) => {
    setEditingCell(null);
    
    // Find the updated team
    const updatedTeam = teams.find((team) => team.id === teamId);
    if (!updatedTeam) return;

    setLoading(true);
    setError(null);
    
    try {
      // Update the team in the database
      const response = await fetch(`/api/league/${teamId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTeam),
      });

      if (!response.ok) {
        throw new Error("Failed to update team data");
      }

      setSuccessMessage("Team updated successfully");
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
    } catch (err) {
      console.error("Error updating team:", err);
      setError("Failed to update team. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    teamId: string,
    field: string
  ) => {
    if (e.key === "Enter") {
      handleCellBlur(teamId, field);
    } else if (e.key === "Escape") {
      setEditingCell(null);
    }
  };

  const addNewTeam = async () => {
    const newTeam = {
      id: "new",
      name: "New Team",
      played: 0,
      won: 0,
      lost: 0,
      nr: 0,
      points: 0,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/league", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
      });

      if (!response.ok) {
        throw new Error("Failed to add new team");
      }

      const createdTeam = await response.json();
      setTeams([...teams, createdTeam]);
      setSuccessMessage("Team added successfully");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error("Error adding team:", err);
      setError("Failed to add team. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (teamId: string) => {
    if (!window.confirm("Are you sure you want to delete this team?")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/league/${teamId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete team");
      }

      setTeams(teams.filter((team) => team.id !== teamId));
      setSuccessMessage("Team deleted successfully");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error("Error deleting team:", err);
      setError("Failed to delete team. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">League Table</h2>
        <button
          onClick={addNewTeam}
          className="bg-neutral-500/25 rounded-2xl p-2 px-4 text-center"
          disabled={loading}
        >
          Add New Team
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className="pb-4 text-xl font-normal">Team Name</th>
            <th className="pb-4 text-xl font-normal ml-5">Position</th>
            <th className="pb-4 text-xl font-normal text-center">PLD</th>
            <th className="pb-4 text-xl font-normal text-center">W</th>
            <th className="pb-4 text-xl font-normal text-center">L</th>
            <th className="pb-4 text-xl font-normal text-center">NR</th>
            <th className="pb-4 text-xl font-normal text-center">Points</th>
            <th className="pb-4 text-xl font-normal text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id} className="border-t border-gray-100">
              <td className="py-4 text-base">{team.name}</td>
              <td className="py-4 text-base text-center">
                {editingCell?.teamId === team.id && editingCell?.field === "pos" ? (
                  <input
                    type="number"
                    value={team.pos}
                    onChange={(e) => handleCellChange(e, team.id, "pos")}
                    onBlur={() => handleCellBlur(team.id, "pos")}
                    onKeyDown={(e) => handleKeyDown(e, team.id, "pos")}
                    className="w-16 p-1 text-center border border-gray-300 rounded"
                    autoFocus
                    min="0"
                  />
                ) : (
                  <span
                    className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => handleCellClick(team.id, "pos")}
                  >
                    {team.pos}
                  </span>
                )}
              </td>
              <td className="py-4 text-base text-center">
                {editingCell?.teamId === team.id && editingCell?.field === "played" ? (
                  <input
                    type="number"
                    value={team.played}
                    onChange={(e) => handleCellChange(e, team.id, "played")}
                    onBlur={() => handleCellBlur(team.id, "played")}
                    onKeyDown={(e) => handleKeyDown(e, team.id, "played")}
                    className="w-16 p-1 text-center border border-gray-300 rounded"
                    autoFocus
                    min="0"
                  />
                ) : (
                  <span
                    className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => handleCellClick(team.id, "played")}
                  >
                    {team.played}
                  </span>
                )}
              </td>
              <td className="py-4 text-base text-center">
                {editingCell?.teamId === team.id && editingCell?.field === "won" ? (
                  <input
                    type="number"
                    value={team.won}
                    onChange={(e) => handleCellChange(e, team.id, "won")}
                    onBlur={() => handleCellBlur(team.id, "won")}
                    onKeyDown={(e) => handleKeyDown(e, team.id, "won")}
                    className="w-16 p-1 text-center border border-gray-300 rounded"
                    autoFocus
                    min="0"
                  />
                ) : (
                  <span
                    className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => handleCellClick(team.id, "won")}
                  >
                    {team.won}
                  </span>
                )}
              </td>
              <td className="py-4 text-base text-center">
                {editingCell?.teamId === team.id && editingCell?.field === "lost" ? (
                  <input
                    type="number"
                    value={team.lost}
                    onChange={(e) => handleCellChange(e, team.id, "lost")}
                    onBlur={() => handleCellBlur(team.id, "lost")}
                    onKeyDown={(e) => handleKeyDown(e, team.id, "lost")}
                    className="w-16 p-1 text-center border border-gray-300 rounded"
                    autoFocus
                    min="0"
                  />
                ) : (
                  <span
                    className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => handleCellClick(team.id, "lost")}
                  >
                    {team.lost}
                  </span>
                )}
              </td>
              <td className="py-4 text-base text-center">
                {editingCell?.teamId === team.id && editingCell?.field === "nr" ? (
                  <input
                    type="number"
                    value={team.nr}
                    onChange={(e) => handleCellChange(e, team.id, "nr")}
                    onBlur={() => handleCellBlur(team.id, "nr")}
                    onKeyDown={(e) => handleKeyDown(e, team.id, "nr")}
                    className="w-16 p-1 text-center border border-gray-300 rounded"
                    autoFocus
                    min="0"
                  />
                ) : (
                  <span
                    className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => handleCellClick(team.id, "nr")}
                  >
                    {team.nr}
                  </span>
                )}
              </td>
              <td className="py-4 text-base text-center">
                {editingCell?.teamId === team.id && editingCell?.field === "points" ? (
                  <input
                    type="number"
                    value={team.points}
                    onChange={(e) => handleCellChange(e, team.id, "points")}
                    onBlur={() => handleCellBlur(team.id, "points")}
                    onKeyDown={(e) => handleKeyDown(e, team.id, "points")}
                    className="w-16 p-1 text-center border border-gray-300 rounded"
                    autoFocus
                    min="0"
                  />
                ) : (
                  <span
                    className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => handleCellClick(team.id, "points")}
                  >
                    {team.points}
                  </span>
                )}
              </td>
              <td className="py-4 text-base text-center">
                <button
                  onClick={() => deleteTeam(team.id)}
                  className="bg-red-100 text-red-800 rounded-2xl p-2 w-20 text-center"
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueView;