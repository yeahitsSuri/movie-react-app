import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import AddFavorites from '../components/AddFavorites';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {updateUserThunk} from '../services/auth-thunks';
import {removeFavoriteMovie} from "../home-page/HomePage";
import RemoveFavorites from "../components/RemoveFavorites";

export const addToList = (movie, currentUser, dispatch, navigate) => {
    if (!currentUser) {
        alert("Please log in to add a movie to your favorites!");
        navigate("/login");
    } else if (currentUser) {
        const movieFavoredByUsers = localStorage.getItem(movie.imdbID);
        const movieFavoredByUsersList = JSON.parse(movieFavoredByUsers);
        if (movieFavoredByUsers) {
            const newMovieFavoredByUsers = [currentUser, ...movieFavoredByUsersList];
            localStorage.setItem(movie.imdbID, JSON.stringify(newMovieFavoredByUsers));
        } else {
            const newMovieFavoredByUsers = [currentUser];
            localStorage.setItem(movie.imdbID, JSON.stringify(newMovieFavoredByUsers));
        }

        const isAlreadyInList = currentUser.list.some(
            (favorite) => favorite.imdbID === movie.imdbID
        );

        if (isAlreadyInList) {
            alert("You already have this movie in your list!");
        }

        if (!isAlreadyInList) {
            const newList = [movie, ...currentUser.list];

            if (currentUser.role === "admin") {
                localStorage.setItem("admin-favorites", JSON.stringify(newList));
            }

            const updatedCurrentUser = {
                ...currentUser,
                list: newList,
            };
            alert("Added successfully!");
            dispatch(updateUserThunk({userId: currentUser._id, user: updatedCurrentUser}));
        }
    }
};

const SearchPage = () => {
    const location = useLocation();
    const searchKey = new URLSearchParams(location.search).get('searchKey') || '';
    const [search, setSearch] = useState(searchKey || '');
    const {currentUser} = useSelector((state) => state.user);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showSearchResultsHeader = movies.length > 0;
    const favoritesList = currentUser ? currentUser.list : [];

    const isMovieInFavorites = (movie) => {
        return favoritesList.some((favorite) => favorite.imdbID === movie.imdbID)
    };


    useEffect(() => {
        const lastSearch = localStorage.getItem('last-search');
        if (lastSearch !== "") {
            setSearch(lastSearch);
            navigate(`/search?searchKey=${lastSearch}`);
        } else if (lastSearch === "" || !lastSearch) {
            setSearch(lastSearch);
            navigate(`/search`);
        }
    }, []);

    const getMovieFromAPI = async () => {
        const url = `http://www.omdbapi.com/?s=${search}&type=movie&apikey=a52e368a`;
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    useEffect(() => {
        getMovieFromAPI(search);
    }, [search]);

    const handleRemoveFavoritesClick = (movie) => {
        removeFavoriteMovie(movie, currentUser, dispatch);
    }

    const handleAddFavoritesClick = (movie) => {
        addToList(movie, currentUser, dispatch, navigate);
    }

    return (
        <div>
            <div className='row d-flex align-items-center mt-3 mb-2'>
                <MovieListHeader header={'Search for "' + search + '": '}/>
            </div>
            <div className='row d-flex align-items-center mt-1 mb-4'>
                <SearchBar searchKey={search} setSearchKey={setSearch}/>
            </div>

            {showSearchResultsHeader && search !== "" && (
                <div>
                    <div className='row d-flex align-items-center mt-3 mb-4'>
                        <MovieListHeader header='Searching Results: '/>
                    </div>
                    <div className='row'>
                        <MovieList
                            movies={movies}
                            handleRemoveFavoritesClick={handleRemoveFavoritesClick}
                            handleAddFavoritesClick={handleAddFavoritesClick}
                            addFavoriteIcon={AddFavorites}
                            removeFavoriteIcon={RemoveFavorites}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
