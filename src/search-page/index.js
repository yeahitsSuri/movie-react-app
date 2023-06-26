import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import AddFavorites from '../components/AddFavorites';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {updateUserThunk} from '../services/auth-thunks';

export const addToList = (movie, currentUser, dispatch, navigate) => {
    if (!currentUser) {
        alert("Please log in to add a movie to your favorites!");
        navigate("/login");  // the login page provides a registration link for the user anyway
    } else if (currentUser) {
        const movieFavoredByUsers = localStorage.getItem(movie.imdbID);
        const movieFavoredByUsersList = JSON.parse(movieFavoredByUsers);
        if (movieFavoredByUsers) {
            const newMovieFavoredByUsers = [currentUser, ...movieFavoredByUsersList];
            localStorage.setItem(movie.imdbID, JSON.stringify(newMovieFavoredByUsers));
        } else { // if the list is null, create a new array
            const newMovieFavoredByUsers = [currentUser];
            localStorage.setItem(movie.imdbID, JSON.stringify(newMovieFavoredByUsers));
        }

        // Check if the movie is already in the favorites list
        const isAlreadyInList = currentUser.list.some((favorite) => favorite.imdbID === movie.imdbID);

        if (isAlreadyInList) {
            alert("You already have this movie in your list!");
        }

        // If the movie is not already in the favorites list, add it
        if (!isAlreadyInList) {
            const newList = [...currentUser.list, movie];

            if (currentUser.role === "admin") {
                localStorage.setItem("admin-favorites", JSON.stringify(newList));
            }

            const updatedCurrentUser = {
                ...currentUser,
                list: newList,
            };
            dispatch(updateUserThunk({ userId: currentUser._id, user: updatedCurrentUser }));
        }
    }
};

const SearchPage = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState('');
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
        const storedSearchKey = localStorage.getItem('search-key');
        const storedMovies = JSON.parse(localStorage.getItem('search-results'));

        if (storedSearchKey) {
            setSearchKey(storedSearchKey);
        }

        if (storedMovies) {
            setMovies(storedMovies);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('search-key', searchKey);
    }, [searchKey]);

    useEffect(() => {
        localStorage.setItem('search-results', JSON.stringify(movies));
    }, [movies]);

    useEffect(() => {
        getMovieFromAPI(searchKey);
    }, [searchKey]);

    const handleAddFavoritesClick = (movie) => {
        addToList(movie, currentUser, dispatch, navigate);
    }

    return (
        <div>
            <div className='row d-flex align-items-center mt-3 mb-2'>
                <MovieListHeader header={'Search for "' + searchKey + '": '}/>
            </div>
            <div className='row d-flex align-items-center mt-1 mb-4'>
                <SearchBar searchKey={searchKey} setSearchKey={setSearchKey}/>
            </div>

            {showSearchResultsHeader && (
                <div>
                    <div className='row d-flex align-items-center mt-3 mb-4'>
                        <MovieListHeader header='Searching Results: '/>
                    </div>
                    <div className='row'>
                        <MovieList
                            movies={movies}
                            handleFavoritesClick={handleAddFavoritesClick}
                            favoriteIcon={AddFavorites}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
