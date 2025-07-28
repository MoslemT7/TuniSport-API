const pool = require('../db');

const getPlayers = async (req, res) => {
  try {
    const { sport } = req.query;

    let query = `
      SELECT players.*
      FROM players
      LEFT JOIN sports ON players.sportID = sports.id
    `;

    const params = [];
    if (sport) {
      query += ` WHERE sports.name = $1 `;
      params.push(sport);
    }

    query += ` ORDER BY players.name`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM players WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Player not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPlayer = async (req, res) => {
  const {
    name,
    lastName,
    nationalityID,
    photoURL,
    strongFoot,
    heigth,
    weight,
    is_active,
    currentTeamID,
    YoB,
    YoD,
    defaultPositionID,
  } = req.body;

  try {
    const query = `
      INSERT INTO players
        (name, lastName, nationalityID, photoURL, strongFoot, heigth, weight, is_active, currentTeamID, "YoB", "YoD", defaultPositionID, created_at)
      VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, NOW())
      RETURNING *;
    `;
    const values = [
      name,
      lastName,
      nationalityID,
      photoURL,
      strongFoot,
      heigth,
      weight,
      is_active,
      currentTeamID,
      YoB,
      YoD,
      defaultPositionID,
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) return res.status(400).json({ error: 'No fields to update' });

  // Build dynamic SET part like: "name"=$1, "lastName"=$2 ...
  const setQuery = fields.map((f, i) => `"${f}"=$${i + 1}`).join(', ');

  try {
    const query = `UPDATE players SET ${setQuery} WHERE id=$${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);

    if (result.rows.length === 0) return res.status(404).json({ error: 'Player not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM players WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Player not found' });
    res.json({ message: 'Player deleted', player: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
