import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import AddFavorites from '../components/AddFavorites';

const SearchPage = ({addFavoriteMovie}) => {
    const [movies, setMovies] = useState([]); // movies from search
    const [searchKey, setSearchKey] = useState(''); // search key the user uses
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
        setSearchKey(''); // Clear the searchKey when refresh
        return () => {
            setMovies([]); // Clear the movies state when refresh
        };
    }, [setSearchKey, setMovies]);

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
                            handleFavoritesClick={addFavoriteMovie}
                            favoriteIcon={AddFavorites}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;