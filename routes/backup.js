const router = require('express').Router();
const path = require('path');
const util = require('util');

const execAsync = util.promisify(require('child_process').exec);

const backupPath = path.join(__dirname, '..', 'backups');

router.get('/backup', async (req, res, next) => {
  try {
    const result = await execAsync(`cd /; mongodump --config=C:/Users/Illia/Desktop/dbcw/dump_config.yaml --out ${backupPath}`);
    res.json({ result: result.stderr.replace(/\t/g, '  ').split('\n').filter((el) => el) });
  } catch (err) {
    next(err);
  }
});

router.get('/restore', async (req, res, next) => {
  try {
    const result = await execAsync(`cd /; mongorestore -d test  ${backupPath}/test --config=C:/Users/Illia/Desktop/dbcw/dump_config.yaml`);
    res.json({ result: result.stderr.replace(/\t/g, '  ').split('\n').filter((el) => el) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;