import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import AddFavorites from '../components/AddFavorites';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateUserThunk} from "../services/auth-thunks";

const SearchPage = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [movies, setMovies] = useState([]); // movies from search
    const [searchKey, setSearchKey] = useState(''); // search key the user uses
    const [list, setList] = useState(currentUser ? currentUser.list : []);
    // if currentUser is logged in, then retrieve their list.
    // Otherwise, set it to empty first
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showSearchResultsHeader = movies.length > 0;

    const getMovieFromAPI = async (searchKey) => {
        const url = `http://www.omdbapi.com/?s=${searchKey}&apikey=a52e368a`;
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    useEffect(() => {
        getMovieFromAPI(searchKey);
    }, [searchKey]);

    useEffect(() => {
        setSearchKey(searchKey);
        return () => {
            setMovies(movies);
        };
    }, [setSearchKey, setMovies]);

    const addToList = (movie) => {
        if (!currentUser) {
            alert("Please log in to add a movie to your favorites!");
            navigate("/login");  // the login page provides registration link for user anyway
        } else if (currentUser) {
            // Check if the movie is already in the favorites list
            const isAlreadyInList = list.some((favorite) => favorite.imdbID === movie.imdbID);

            if (isAlreadyInList) {
                alert("You already have this movie in your list!");
            }

            // If the movie is not already in the favorites list, add it
            if (!isAlreadyInList) {
                const newList = [...list, movie];
                setList(newList);
                const updatedCurrentUser = {
                    ...currentUser, list: newList,
                };
                dispatch(updateUserThunk({userId: currentUser._id, user: updatedCurrentUser}));
            }
        }
    };

    return (
        <div>
            <div className='row d-flex align-items-center mt-3 mb-2'>
                <MovieListHeader header='Search Here: '/>
            </div>
            <div className='row d-flex align-items-center mt-1 mb-4'>
                <SearchBar searchKey='' setSearchKey={setSearchKey}/>
            </div>

            {/* Display Searching Results */}
            {showSearchResultsHeader && (
                <div>
                    <div className='row d-flex align-items-center mt-3 mb-4'>
                        <MovieListHeader header='Searching Results: '/>
                    </div>
                    <div className='row'>
                        <MovieList
                            movies={movies}
                            handleFavoritesClick={addToList}
                            favoriteIcon={AddFavorites}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;