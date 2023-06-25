import React from 'react';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import RemoveFavorites from '../components/RemoveFavorites';

const HomePage = ({ favorites, removeFavoriteMovie}) => {
   
    return (
        <>       
            {/* Display User's Favorites */}
            <div className='row d-flex align-items-center mt-3 mb-4'>
                <MovieListHeader header='My Favorites'/>
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
