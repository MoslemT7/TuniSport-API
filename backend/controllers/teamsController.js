const pool = require('../db');

// Get all teams
const getTeams = async (req, res) => {
  const { id } = req.query;
  try {
    const sql = 'SELECT * FROM teams WHERE "sportID" = $1';
    const params = [id];

    const { rows } = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get team by ID
const getTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM teams WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Team not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new team
const createTeam = async (req, res) => {
  const {
    sportID,
    name,
    abbreviation,
    logoURL,
    foundedYear,
    cityID,
    mainVenue,
    parentTeamID,
  } = req.body;

  try {
    const query = `
      INSERT INTO teams
        (sportID, name, abbreviation, "logoURL", "foundedYear", "cityID", "mainVenue", "parentTeamID")
      VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `;
    const values = [sportID, name, abbreviation, logoURL, foundedYear, cityID, mainVenue, parentTeamID];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update team
const updateTeam = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) return res.status(400).json({ error: 'No fields to update' });

  const setQuery = fields.map((f, i) => `"${f}"=$${i + 1}`).join(', ');

  try {
    const query = `UPDATE teams SET ${setQuery} WHERE id=$${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Team not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete team
const deleteTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM teams WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Team not found' });
    res.json({ message: 'Team deleted', team: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
