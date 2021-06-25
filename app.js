require('dotenv').config();
const mongoose = require('mongoose');
const app = require('express')();
const routes = require('./routes');
// const errorHandler = require('./helpers/errorHandler');
const port = 3000;
const mongoURI = process.env.mongoURI;
const morgan = require('morgan');


app.use(morgan('dev'));
app.use('/api', routes);
// app.use(errorHandler);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${port}`);
  });
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    // eslint-disable-next-line no-console
    if (err) console.log(err);
    else {
      // eslint-disable-next-line no-console
      console.info('Mongo DB connected');
    }
});