const pool = require('../db');

const getMatches = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM matches ORDER BY "matchDate" DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM matches WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Match not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createMatch = async (req, res) => {
  const {
    competitionID,
    homeTeamID,
    awayTeamID,
    matchDate,
    venueID,
    status,
    refereeID,
  } = req.body;

  try {
    const query = `
      INSERT INTO matches
        ("competitionID", "homeTeamID", "awayTeamID", "matchDate", "venueID", status, "refereeID", created_at)
      VALUES
        ($1,$2,$3,$4,$5,$6,$7,NOW())
      RETURNING *;
    `;
    const values = [competitionID, homeTeamID, awayTeamID, matchDate, venueID, status, refereeID];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMatch = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) return res.status(400).json({ error: 'No fields to update' });

  const setQuery = fields.map((f, i) => `"${f}"=$${i + 1}`).join(', ');

  try {
    const query = `UPDATE matches SET ${setQuery} WHERE id=$${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Match not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM matches WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Match not found' });
    res.json({ message: 'Match deleted', match: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
};
