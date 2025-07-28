const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

const playersRoutes = require('./routes/playersRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const competitionsRoutes = require('./routes/competitionsRoutes');
const matchesRoutes = require('./routes/matchesRoutes');
const lookupRoutes = require('./routes/lookupRoutes');

app.use('/api/lookup', lookupRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/competitions', competitionsRoutes);
app.use('/api/matches', matchesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

