const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
      type: String,
  },
  year: {
      type: Number,
  },
  ratedn: {
      type: String,
  },
  releaseDate: {
      type: Date,
  },
  runtime: {
      type: Number,
  },
  genre: {
      type: String,
  },
  director: {
      type: String,
  },
  writer: {
    type: String,
  },
  actors: {
    type: String,
  },
  plot: {
    type: String,
  },
  language: {
      type: String,
  },
  country: {
      type: String,
  },
  awards: {
    type: String,
  },
  metascore: {
      type: Number,
  },
  imdbVotes: {
      type: Number,
  },
  imdbID: 
  {
      type: String,
  },
});

module.exports = mongoose.model('Movie', schema);