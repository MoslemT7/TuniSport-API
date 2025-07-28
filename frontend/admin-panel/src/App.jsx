import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import './index.css';
// Import your pages (I’ll provide simple placeholders you can expand later)
import Players from './pages/Players';
import Teams from './pages/Teams';
import Competitions from './pages/Competitions';
import Matches from './pages/Matches';

export default function App() {
  return (
    <>
      {/* Top navigation bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TuniSports Admin
          </Typography>
          <Button color="inherit" component={Link} to="/players">Players</Button>
          <Button color="inherit" component={Link} to="/teams">Teams</Button>
          <Button color="inherit" component={Link} to="/competitions">Competitions</Button>
          <Button color="inherit" component={Link} to="/matches">Matches</Button>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box sx={{ padding: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/players" replace />} />
          <Route path="/players" element={<Players />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/matches" element={<Matches />} />
          {/* Add more routes as needed */}
        </Routes>
      </Box>
    </>
  );
}
