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

    const removeFavoriteMovie = (movie) => {
        const newList = list.filter(
            (item) => item.imdbID !== movie.imdbID
        );
        setList(newList);
        const updatedCurrentUser = {
            ...currentUser, list: newList,
        };
        dispatch(updateUserThunk({userId: currentUser._id, user: updatedCurrentUser}));
    };
   
    return (
        <>       
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
