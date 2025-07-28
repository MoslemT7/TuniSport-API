const pool = require('../db');

const getCompetitions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM competitions ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCompetitionById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM competitions WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Competition not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCompetition = async (req, res) => {
  const {
    sportID,
    name,
    level,
    ageGroupID,
    regionID,
    season,
  } = req.body;

  try {
    const query = `
      INSERT INTO competitions
        ("sportID", name, level, "ageGroupID", "regionID", season)
      VALUES
        ($1,$2,$3,$4,$5,$6)
      RETURNING *;
    `;
    const values = [sportID, name, level, ageGroupID, regionID, season];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCompetition = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) return res.status(400).json({ error: 'No fields to update' });

  const setQuery = fields.map((f, i) => `"${f}"=$${i + 1}`).join(', ');

  try {
    const query = `UPDATE competitions SET ${setQuery} WHERE id=$${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Competition not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCompetition = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM competitions WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Competition not found' });
    res.json({ message: 'Competition deleted', competition: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCompetitions,
  getCompetitionById,
  createCompetition,
  updateCompetition,
  deleteCompetition,
};
