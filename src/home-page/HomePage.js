import React, {useState} from 'react';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import RemoveFavorites from '../components/RemoveFavorites';
import {useSelector} from "react-redux";
import {updateUserThunk} from "../services/auth-thunks";
import {useDispatch} from "react-redux";

const HomePage = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [list, setList] = useState(currentUser ? currentUser.list : []);
    const dispatch = useDispatch();
    const adminFavorites = localStorage.getItem("admin-favorites");
    const adminFavoritesList = JSON.parse(adminFavorites);

    const removeFavoriteMovie = (movie) => {
        // filter out the gievn movie
        const newList = list.filter(
            (item) => item.imdbID !== movie.imdbID
        );
        if (currentUser.role === "admin") {
            localStorage.setItem("admin-favorites", JSON.stringify(newList));
        }
        // for both users, update themselves 
        setList(newList);
        const updatedCurrentUser = {
            ...currentUser, list: newList,
        };
        dispatch(updateUserThunk({userId: currentUser._id, user: updatedCurrentUser}));
    };
   
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
                movies={list}
                handleFavoritesClick={removeFavoriteMovie}
                favoriteIcon={RemoveFavorites}
                />
            </div>
        </>
    );
};

export default HomePage;
