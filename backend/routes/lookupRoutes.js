const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/teams', async (req, res) => {
  const { sport } = req.query;
  const query = `
    SELECT t.name
    FROM teams t
    LEFT JOIN sports s ON t."sportID" = s.id
    WHERE s.name = $1
    ORDER BY t.name
  `;
  const values = [sport];
  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/nationalities', async (req, res) => {
  try {
    const result = await pool.query('SELECT name FROM nationalities ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/positions', async (req, res) => {
  try {
    const { sport } = req.query;
    let query = `
      SELECT positions.name
      FROM positions
      LEFT JOIN sports ON positions."sportID" = sports.id
    `;
    const params = [];
    if (sport) {
      query += ` WHERE sports.name = $1 `;
      params.push(sport);
    }
    query += ` ORDER BY positions.name`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
