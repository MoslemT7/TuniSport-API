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

export default function Competitions() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch competitions data from backend API
  const fetchCompetitions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/competitions');
      setCompetitions(response.data);
    } catch (err) {
      setError('Failed to fetch competitions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Competitions
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Add New Competition
      </Button>

      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Season</TableCell>
                <TableCell>Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {competitions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No competitions found.
                  </TableCell>
                </TableRow>
              ) : (
                competitions.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell>{comp.name}</TableCell>
                    <TableCell>{comp.season}</TableCell>
                    <TableCell>{comp.level}</TableCell>
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
