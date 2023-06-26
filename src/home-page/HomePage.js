import React from 'react';
import MovieList from '../components/MovieList';
import RemoveFavorites from '../components/RemoveFavorites';
import {useDispatch, useSelector} from "react-redux";
import {updateUserThunk} from "../services/auth-thunks";
import {addToList} from "../search-page";
import {useNavigate} from "react-router-dom";
import AddFavorites from "../components/AddFavorites";
import MovieListHeader from "../components/MovieListHeader";

export const removeFavoriteMovie = (movie, currentUser, dispatch) => {
    // first fetch the list of users that favor this movie
    const movieFavoredByUsers = localStorage.getItem(movie.imdbID);
    const movieFavoredByUsersList = JSON.parse(movieFavoredByUsers);
    // then remove the currentUser from the list
    const newMovieFavoredByUsersList = movieFavoredByUsersList.filter(
        (user) => user._id !== currentUser._id
    );
    localStorage.setItem(movie.imdbID, JSON.stringify(newMovieFavoredByUsersList));

    // filter out the given movie
    const newList = currentUser.list.filter(
        (item) => item.imdbID !== movie.imdbID
    );
    if (currentUser.role === "admin") {
        localStorage.setItem("admin-favorites", JSON.stringify(newList));
    }
    // for both users, update themselves
    const updatedCurrentUser = {
        ...currentUser,
        list: newList,
    };
    dispatch(updateUserThunk({userId: currentUser._id, user: updatedCurrentUser}));
};

const HomePage = () => {
    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const adminFavorites = localStorage.getItem("admin-favorites");
    const adminFavoritesList = (adminFavorites ? JSON.parse(adminFavorites) : []);

    const handleRemoveFavoritesClick = (movie) => {
        removeFavoriteMovie(movie, currentUser, dispatch);
    }

    const handleAddFavoritesClick = (movie) => {
        addToList(movie, currentUser, dispatch, navigate);
    }

    return (
        <>
            <div className='row d-flex align-items-center mt-3 mb-4'>
                <MovieListHeader header='Admin Recommends for You'/>
            </div>

            <div className='row'>
                <MovieList
                    movies={adminFavoritesList}
                    handleRemoveFavoritesClick={handleRemoveFavoritesClick}
                    handleAddFavoritesClick={handleAddFavoritesClick}
                    addFavoriteIcon={AddFavorites}
                    removeFavoriteIcon={RemoveFavorites}
                />
            </div>

            <hr/>

            <div className='row d-flex align-items-center mt-3 mb-4'>
                <MovieListHeader header='My Favorites'/>
            </div>

            <div className='row'>
                <MovieList
                    movies={currentUser ? currentUser.list : []}
                    handleRemoveFavoritesClick={handleRemoveFavoritesClick}
                    handleAddFavoritesClick={handleAddFavoritesClick}
                    addFavoriteIcon={AddFavorites}
                    removeFavoriteIcon={RemoveFavorites}
                />
            </div>

        </>
    );
};

export default HomePage;
