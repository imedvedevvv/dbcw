const router = require('express').Router();

const moviesService = require('../services/moviesService');

router.get('/stats', async (req, res, next) => {
  try {
    const data = await moviesService.getStats();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/charts', async (req, res, next) => {
  try {
    const data = await moviesService.getChart();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:title', async (req, res, next) => {
  try {
    const { title } = req.params;
    if (!title) throw new Error('Title is required');
    const data = await moviesService.getMovieByTitle(title);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;