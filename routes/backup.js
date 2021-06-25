const router = require('express').Router();
const path = require('path');
const util = require('util');

const execAsync = util.promisify(require('child_process').exec);

const backupPath = path.join(__dirname, '..', 'backups', ).replace(/\\/g, '/');

router.get('/backup', async (req, res, next) => {
  try {
    const result = await execAsync(`D:/MongoDB/Server/4.4/bin/mongodump --out C:/Users/Illia/Desktop/dbcw/backups`);
    res.json({ result: result.stderr.replace(/\t/g, '  ').split('\n').filter((el) => el) });
  } catch (err) {
    next(err);
  }
});

router.get('/restore', async (req, res, next) => {
  try {
    const result = await execAsync(`D:/MongoDB/Server/4.4/bin/mongorestore C:/Users/Illia/Desktop/dbcw/backups`);
    res.json({ result: result.stderr.replace(/\t/g, '  ').split('\n').filter((el) => el) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;