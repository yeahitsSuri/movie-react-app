import React from "react";
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";

const MovieList = (props) => {
    const {currentUser} = useSelector((state) => state.user);

    const isFavorite = (movie) => {
        if (currentUser) {
            return currentUser.list.some((favoriteMovie) => favoriteMovie.imdbID === movie.imdbID);
        } else {
           return false;
        }
    };

    const handleFavoritesClick = (movie) => {
        if (isFavorite(movie)) {
            props.handleRemoveFavoritesClick(movie);
        } else {
            props.handleAddFavoritesClick(movie);
        }
    };

    return (
        <div className="d-flex flex-wrap movie-list-card">
            {props.movies &&
             props.movies.map((movie, index) => (
                 <div className="image-container movie ml-2" key={index}>
                     <Link to={`/details/${movie.imdbID}`}>
                         <img src={movie.Poster} alt="movie"/>
                     </Link>
                     <div
                         onClick={() => handleFavoritesClick(movie)}
                         className="overlay d-flex align-items-center justify-content-center"
                     >
                         {isFavorite(movie) ? (
                             <props.removeFavoriteIcon/>
                         ) : (
                              <props.addFavoriteIcon/>
                          )}
                     </div>
                 </div>
             ))}
        </div>
    );
};

export default MovieList;
