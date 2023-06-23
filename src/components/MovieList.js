import React from "react";

const MovieList = (props) => {
  const FavoriteIcon = props.favoriteIcon;

  return (
    <div className="d-flex flex-nowrap">
      {props.movies &&
        props.movies.map((movie, index) => (
          <div className="image-container d-flex justify-content-start m-3" key={index}>
            <img src={movie.Poster} alt="movie" />
            <div
              onClick={() => props.handleFavouritesClick(movie)}
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
