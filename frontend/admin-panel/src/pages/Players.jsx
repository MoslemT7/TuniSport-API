import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerForm from '../components/PlayerForm';
import '../index.css';

const SPORT_ID = {
  football: 'b2d0aaa6-222a-4774-88e1-eeeca301dcc3',
  basketball: '31249984-6e14-46f9-b0d7-de2a7727ff68',
  volleyball: '9deea407-a523-4f66-a812-cf117cf987d2',
};

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSport, setSelectedSport] = useState('football');
  const [showForm, setShowForm] = useState(true);
  const [showPlayers, setShowPlayers] = useState(false);

  const fetchPlayers = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get('/api/players', {
        params: { sportId: selectedSport ? SPORT_ID[selectedSport] : '' },
      });
      setPlayers(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerAdded = () => {
    setShowForm(false);
    setShowPlayers(true);
    fetchPlayers(selectedSport);
  };

  const toggleView = () => {
    setShowForm((prev) => !prev);
    setShowPlayers((prev) => !prev);
    if (!showPlayers) {
      fetchPlayers(selectedSport);
    }
  };

  useEffect(() => {
    fetchPlayers(selectedSport);
  }, [selectedSport]);

  

  return (
    <div className="container mx-auto p-8">
      <button
        className="bg-primary text-white px-4 py-2 rounded-md mb-4"
        onClick={toggleView}
      >
        {showForm ? 'Show All Players' : 'Add New Player'}
      </button>
      <div className="mb-4">
        <label htmlFor="sport" className="block text-gray-700 text-sm font-bold mb-2">
          Sport
        </label>
        <select
          id="sport"
          className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
        >
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
          <option value="volleyball">Volleyball</option>
        </select>
      </div>
      <div className="mb-4"></div>

      {showForm && <PlayerForm onSuccess={handlePlayerAdded} sport={selectedSport} />}
      {showPlayers && (
        <>
          {loading && (
            <div className="flex justify-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {!loading && !error && (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Last Name</th>
                  <th className="px-4 py-2">Nationality</th>
                  <th className="px-4 py-2">Strong Foot</th>
                  <th className="px-4 py-2">Height (cm)</th>
                  <th className="px-4 py-2">Weight (kg)</th>
                  <th className="px-4 py-2">Current Team</th>
                  <th className="px-4 py-2">Active</th>
                </tr>
              </thead>
              <tbody>
                {players.length === 0 ? (
                  <tr>
                    <td className="text-center" colSpan={8}>No players found.</td>
                  </tr>
                ) : (
                  players.map((player) => (
                    <tr key={player.id}>
                      <td className="px-4 py-2">{player.name || '-'}</td>
                      <td className="px-4 py-2">{player.lastName || '-'}</td>
                      <td className="px-4 py-2">{player.nationalityName || player.nationalityID || '-'}</td>
                      <td className="px-4 py-2">{player.strongFoot || '-'}</td>
                      <td className="px-4 py-2">{player.height || '-'}</td>
                      <td className="px-4 py-2">{player.weight || '-'}</td>
                      <td className="px-4 py-2">{player.currentTeamName || player.currentTeamID || '-'}</td>
                      <td className="px-4 py-2">{player.is_active ? 'Yes' : 'No'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
