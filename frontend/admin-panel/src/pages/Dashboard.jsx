import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Grid, Paper, CircularProgress, Alert } from '@mui/material';

export default function Dashboard() {
  const [stats, setStats] = useState({
    players: 0,
    teams: 0,
    matches: 0,
    competitions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch players count
      const playersRes = await axios.get('/api/players');
      // Fetch teams count
      const teamsRes = await axios.get('/api/teams');
      // Fetch matches count
      const matchesRes = await axios.get('/api/matches');
      // Fetch competitions count
      const competitionsRes = await axios.get('/api/competitions');

      setStats({
        players: playersRes.data.length,
        teams: teamsRes.data.length,
        matches: matchesRes.data.length,
        competitions: competitionsRes.data.length,
      });
    } catch (err) {
      setError('Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Players</Typography>
            <Typography variant="h4">{stats.players}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Teams</Typography>
            <Typography variant="h4">{stats.teams}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Matches</Typography>
            <Typography variant="h4">{stats.matches}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Competitions</Typography>
            <Typography variant="h4">{stats.competitions}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
