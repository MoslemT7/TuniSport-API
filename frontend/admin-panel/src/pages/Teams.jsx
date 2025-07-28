import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  CircularProgress,
  Alert,
  Button,
  Avatar,
} from '@mui/material';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/teams');
      setTeams(response.data);
    } catch (err) {
      setError('Failed to fetch teams.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Teams
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Add New Team
      </Button>

      {loading && <CircularProgress />}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Logo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Abbreviation</TableCell>
                <TableCell>Founded Year</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Sport</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No teams found.
                  </TableCell>
                </TableRow>
              ) : (
                teams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      {team.logoURL ? (
                        <Avatar
                          src={team.logoURL}
                          alt={team.name}
                          variant="square"
                          sx={{ width: 56, height: 56 }}
                        />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>{team.name || '-'}</TableCell>
                    <TableCell>{team.abbreviation || '-'}</TableCell>
                    <TableCell>{team.foundedYear || '-'}</TableCell>
                    <TableCell>{team.cityName || team.cityID || '-'}</TableCell>
                    <TableCell>{team.sportName || team.sportID || '-'}</TableCell>
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
