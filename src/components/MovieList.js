import React from "react";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

const MovieList = ({movies, handleFavoritesClick, favoriteIcon}) => {
  const {currentUser} = useSelector((state) => state.user);

  // Filter out movies that are already in the favorites list
  const filteredMovies = movies.filter(
      (movie) => !currentUser || !currentUser.list.some((favorite) => favorite.imdbID === movie.imdbID)
  );

  return (
    <div className="d-flex flex-wrap">
      {filteredMovies &&
       filteredMovies.map((movie, index) => (
          <div className="image-container movie ml-2" key={index}>
            <Link to={`/details/${movie.imdbID}`}>
              <img src={movie.Poster} alt="movie" />
            </Link>
            <div
              onClick={() => handleFavoritesClick(movie)}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <favoriteIcon />
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieList;
