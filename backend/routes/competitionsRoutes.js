const express = require('express');
const router = express.Router();

const {
  getCompetitions,
  getCompetitionById,
  createCompetition,
  updateCompetition,
  deleteCompetition,
} = require('../controllers/competitionsController');

router.get('/', getCompetitions);
router.get('/:id', getCompetitionById);
router.post('/', createCompetition);
router.put('/:id', updateCompetition);
router.delete('/:id', deleteCompetition);

module.exports = router;
