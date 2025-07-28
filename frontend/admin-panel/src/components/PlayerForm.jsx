import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerForm = ({ onSuccess, sport }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nationalityId: '',
    photoUrl: '',
    strongFoot: '',
    height: '',
    weight: '',
    isActive: true,
    currentTeamId: '',
    yearOfBirth: '',
    yearOfDeath: '',
    defaultPositionId: '',
    sportId: ''
  });
  const [nationalities, setNationalities] = useState([]);
  const [positions, setPositions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [nationalitiesRes, positionsRes, teamsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/lookup/nationalities'),
          axios.get('http://localhost:5000/api/lookup/positions', { params: { sport } }),
          axios.get('http://localhost:5000/api/teams', { params: { sport } })
        ]);
        setNationalities(nationalitiesRes.data);
        setPositions(positionsRes.data);
        setTeams(teamsRes.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, [sport]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/players', form);
      alert('Player saved successfully!');
      setForm({ ...form, firstName: '', lastName: '', photoUrl: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Error saving player.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-dark p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Add Player</h2>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="pr-4">First Name:</td>
            <td>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              />
            </td>
          </tr>
          <tr>
            <td className="pr-4">Last Name:</td>
            <td>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              />
            </td>
          </tr>
          <tr>
            <td className="pr-4">Nationality:</td>
            <td>
              <select
                name="nationalityId"
                value={form.nationalityId}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              >
                <option value="">Select Nationality</option>
                {nationalities.map((nat) => (
                  <option key={nat.id} value={nat.id}>{nat.name}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className="pr-4">Photo URL:</td>
            <td>
              <input
                type="url"
                name="photoUrl"
                placeholder="Photo URL"
                value={form.photoUrl}
                onChange={handleChange}
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              />
            </td>
          </tr>
          <tr>
            <td className="pr-4">Strong Foot:</td>
            <td>
              <select
                name="strongFoot"
                value={form.strongFoot}
                onChange={handleChange}
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              >
                <option value="">Select Strong Foot</option>
                <option value="Left">Left</option>
                <option value="Right">Right</option>
                <option value="Both">Both</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="pr-4">Height (cm):</td>
            <td>
              <input
                type="number"
                name="height"
                placeholder="Height (cm)"
                value={form.height}
                onChange={handleChange}
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              />
            </td>
          </tr>
          <tr>
            <td className="pr-4">Weight (kg):</td>
            <td>
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={handleChange}
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              />
            </td>
          </tr>
          <tr>
            <td className="pr-4 flex items-center">Active:</td>
            <td>
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="ml-2"
              />
            </td>
          </tr>
          <tr>
            <td className="pr-4">Team:</td>
            <td>
              <select
                name="currentTeamId"
                value={form.currentTeamId}
                onChange={handleChange}
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              >
                <option value="">Select Team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className="pr-4">Year of Birth:</td>
            <td>
              <input
                type="date"
                name="yearOfBirth"
                value={form.yearOfBirth}
                onChange={handleChange}
                placeholder="Year of Birth"
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              />
            </td>
          </tr>
          <tr>
            <td className="pr-4">Year of Death:</td>
            <td>
              <input
                type="date"
                name="yearOfDeath"
                value={form.yearOfDeath}
                onChange={handleChange}
                placeholder="Year of Death"
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              />
            </td>
          </tr>
          <tr>
            <td className="pr-4">Default Position:</td>
            <td>
              <select
                name="defaultPositionId"
                value={form.defaultPositionId}
                onChange={handleChange}
                className="block w-full px-4 py-2 mb-2 text-dark rounded-md border border-border"
              >
                <option value="">Select Position</option>
                {positions.map((pos) => (
                  <option key={pos.id} value={pos.id}>{pos.name}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-dark text-light font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Player'}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default PlayerForm;
