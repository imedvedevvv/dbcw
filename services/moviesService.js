const axios = require('axios');
// const dayjs = require('dayjs');
const ss = require('simple-statistics');
const { Promise } = require('mongoose');
const Movie = require('../models/Movie');

const APIKey = process.env.APIKey;

module.exports.getMovieByTitle = async (title) => 
{
    const idOptions = {
    method: 'GET',
    url: `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${title}/`,
    headers: {
    'x-rapidapi-key': APIKey,
    'x-rapidapi-host': 'data-imdb1.p.rapidapi.com'
        },
    };
    const idResponse = await axios.request(idOptions);
    const imdbId = idResponse.data.Result[0]?.imdb_id;
    if (imdbId)
    {
        const movie = await Movie.findOne({imdbID: imdbId});
        if (movie) return movie;
        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {i: imdbId, r: 'json'},
            headers: {
              'x-rapidapi-key': APIKey,
              'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
          };
          const { data } = await axios.request(options);
          if (data)
          {
            await Movie.create({
                title: data.Title || null,
                year: parseInt(data.Year) || null,  
                rated: data.Rated || null,
                releaseDate: Date.parse(data.Released) || null,
                runtime: parseInt(data.Runtime.split('  ')[0] || null),
                genre: data.Genre || null,
                director: data.Director || null,
                writer: data.Writer || null,
                actors: data.Actors || null,
                plot: data.Actors || null,
                language: data.Language || null,
                country: data.Country || null,
                awards: data.Awards || null,
                metascore: parseInt(data.Metascore) || null,
                imdbVotes: parseFloat((data.imdbVotes).replace(',', '')) || null,
                imdbID: data.imdbID || null,
            });
            return Movie.findOne({imdbID: imdbId})
          }
          return 'Movie not found';
    }
    return 'Movie not found';
};


module.exports.deleteAll = async () => {
  const result = await Movie.deleteMany();
  return result;
};


module.exports.getStats = async () => {
  const data = await Movie.find();
  if (!data) return `No data found`;

  const votes = data.map((movie) => movie.imdbVotes);
  const metascore = data.map((movie) => movie.metascore);

  const maximumScore = Math.max.apply(null, metascore);
  const minimumScore = Math.min.apply(null, metascore);
  const minVotes = ss.min(votes);
  const maxVotes = ss.max(votes);
  const medianValue = ss.median(votes);
  const meanValue = ss.mean(votes);

  return {
    'Min votes': minVotes,
    'Max votes': maxVotes,
    'Min score': minimumScore,
    'Max score': maximumScore,
    'Median votes': medianValue,
    'Mean (average) votes': meanValue,
  };
};

module.exports.getChart = async () => {
  const movies = await Movie.find().limit(100);
  if (!movies) return `No data found `;

  const titles = movies.map((movie) => movie.title);
  const scores = movies.map((movie) => movie.metascore);

  const response = await axios.post('https://quickchart.io/chart/create', {
    chart: {
      type: 'bar',
      data: {
        labels: titles,
        datasets: [{
          label: "Metascore ratings",
          data: scores,
        }],
      },
    },
    width: 1280,
    height: 720,
    backgroundColor: 'white',
    devicePixelRatio: 1,
    format: 'png',
    version: '2.9.3',
  });
  return response.data.url;
};

