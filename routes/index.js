const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

const movies = require('./movies');

const backup = require('./backup');

router.use('/backup', backup);
router.use('/movies', movies);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/health', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;