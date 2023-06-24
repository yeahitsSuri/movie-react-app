import React from 'react';
import { useParams } from 'react-router-dom';

const MovieIntroScreen = ({ movies, favourites }) => {
  const { id } = useParams();

  // Search for the movie in both the movies and favourites arrays
  const movie = movies.find((movie) => movie.imdbID === id) || favourites.find((movie) => movie.imdbID === id);

  if (!movie) {
    return <div>CAN NOT FIND THIS MOVIE.</div>;
  }

  return (
    <div>
      <h1>{movie.Title}</h1>
      <p>{movie.Plot}</p>
      {/* Display other movie details */}
    </div>
  );
};

export default MovieIntroScreen;
