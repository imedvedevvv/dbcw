module.exports = (err, req, res, next) => {
    if (!err) {
      next();
    }
  
    res.status(err.status || 500).json({ message: err.message });
  };