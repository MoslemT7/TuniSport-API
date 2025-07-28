import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  CircularProgress,
  Alert,
} from '@mui/material';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/matches');
      setMatches(response.data);
    } catch (err) {
      setError('Failed to fetch matches.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Matches
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Add New Match
      </Button>

      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Home Team</TableCell>
                <TableCell>Away Team</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No matches found.
                  </TableCell>
                </TableRow>
              ) : (
                matches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell>{new Date(match.matchDate).toLocaleString()}</TableCell>
                    <TableCell>{match.homeTeamName || match.homeTeamID}</TableCell>
                    <TableCell>{match.awayTeamName || match.awayTeamID}</TableCell>
                    <TableCell>{match.status || 'N/A'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
