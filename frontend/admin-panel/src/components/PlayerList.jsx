// src/pages/Players.jsx
import React, { useEffect, useState } from 'react';
import { fetchPlayers, createPlayer, updatePlayer, deletePlayer } from '../api';
import PlayerForm from '../components/PlayerForm';
import { List, ListItem, ListItemText, Button, Box } from '@mui/material';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const loadPlayers = async () => {
    const res = await fetchPlayers();
    setPlayers(res.data);
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const onSave = async (data) => {
    if (editingPlayer) {
      await updatePlayer(editingPlayer.id, data);
    } else {
      await createPlayer(data);
    }
    setEditingPlayer(null);
    loadPlayers();
  };

  const onEdit = (player) => setEditingPlayer(player);

  const onDelete = async (id) => {
    await deletePlayer(id);
    loadPlayers();
  };

  return (
    <Box sx={{ display: 'flex', gap: 4, p: 4 }}>
      <Box>
        <h2>Players</h2>
        <List sx={{ width: 300 }}>
          {players.map(p => (
            <ListItem key={p.id} secondaryAction={
              <>
                <Button onClick={() => onEdit(p)}>Edit</Button>
                <Button color="error" onClick={() => onDelete(p.id)}>Delete</Button>
              </>
            }>
              <ListItemText primary={`${p.name} ${p.lastName}`} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <h2>{editingPlayer ? 'Edit Player' : 'Add New Player'}</h2>
        <PlayerForm initialData={editingPlayer} onSubmit={onSave} />
      </Box>
    </Box>
  );
}
