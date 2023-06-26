import React from "react";
import { Link } from 'react-router-dom';

const MovieList = (props) => {
  const FavoriteIcon = props.favoriteIcon;

  return (
    <div className="d-flex flex-wrap">
      {props.movies &&
        props.movies.map((movie, index) => (
          <div className="image-container movie ml-2" key={index}>
            <Link to={`/details/${movie.imdbID}`}>
              <img src={movie.Poster} alt="movie" />
            </Link>
            <div
              onClick={() => props.handleFavoritesClick(movie)}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <FavoriteIcon />
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieList;
