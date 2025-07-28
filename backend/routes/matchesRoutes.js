const express = require('express');
const router = express.Router();

const {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
} = require('../controllers/matchesController');

router.get('/', getMatches);
router.get('/:id', getMatchById);
router.post('/', createMatch);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);

module.exports = router;
