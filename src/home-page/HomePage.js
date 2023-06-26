import React, {useState} from 'react';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import RemoveFavorites from '../components/RemoveFavorites';
import {useSelector} from "react-redux";
import {updateUserThunk} from "../services/auth-thunks";
import {useDispatch} from "react-redux";

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
    dispatch(updateUserThunk({ userId: currentUser._id, user: updatedCurrentUser }));
};

const HomePage = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [list, setList] = useState(currentUser ? currentUser.list : []);
    const dispatch = useDispatch();
    const adminFavorites = localStorage.getItem("admin-favorites");
    const adminFavoritesList = JSON.parse(adminFavorites);

    const handleFavoritesClick = (movie) => {
        removeFavoriteMovie(movie, currentUser, dispatch);
    }
   
    return (
        <>
            {/* Display admin favorites */}
            <div className='row d-flex align-items-center mt-3 mb-4'>
                <MovieListHeader header='Admin Favorites for You'/>
            </div>

            <div className='row'>
                <MovieList
                    movies={adminFavoritesList}
                    handleFavoritesClick={removeFavoriteMovie}
                    favoriteIcon={RemoveFavorites}
                />
            </div>

            {/* Display User's Favorites */}
            <div className='row d-flex align-items-center mt-3 mb-4'>
                <MovieListHeader header='My Favorites'/>
            </div>

            <div className='row'>
                <MovieList
                movies={currentUser ? currentUser.list : []}
                handleFavoritesClick={handleFavoritesClick}
                favoriteIcon={RemoveFavorites}
                />
            </div>
        </>
    );
};

export default HomePage;
