import React, { useState } from 'react';
import axios from 'axios';
import './SearchMovie.css';
import YOUR_API_KEY from './config';

function SearchMovie() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const searchMovie = async (query) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: YOUR_API_KEY,
          query: query,
          limit: 10
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovie(query);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a movie..." className="input" />
        <button type="submit" className="button">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="movies">
        {movies.map(movie => (
          <div key={movie.id} className="movie">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="poster" />
            <div className="info">
              <h2 className="title">{movie.title}</h2>
              <p className="overview">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMovie;
