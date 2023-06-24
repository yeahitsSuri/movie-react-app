import React from 'react';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import AddFavorites from '../components/AddFavorites';
import RemoveFavorites from '../components/RemoveFavorites';

const HomePage = ({movies, favorites, addFavoriteMovie, removeFavoriteMovie}) => {
    const showSearchResultsHeader = movies.length > 0;

    return (
        <>
            {/* Display Searching Results */}
            {showSearchResultsHeader && (
                <div className='row d-flex align-items-center mt-3 mb-4'>
                    <MovieListHeader header='Searching Results: '/>
                </div>
            )}

            <div className='row'>
                <MovieList
                    movies={movies}
                    handleFavoritesClick={addFavoriteMovie}
                    favoriteIcon={AddFavorites}
                />
            </div>

            {/* Display User's Favorites */}
            <div className='row d-flex align-items-center mt-3 mb-4'>
                <MovieListHeader header='Favorites'/>
            </div>

            <div className='row'>
                <MovieList
                movies={favorites}
                handleFavoritesClick={removeFavoriteMovie}
                favoriteIcon={RemoveFavorites}
                />
            </div>
                
            
        </>
    );
};

export default HomePage;
