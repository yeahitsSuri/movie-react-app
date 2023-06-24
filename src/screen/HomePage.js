import React from 'react';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import AddFavourites from '../components/AddFavourites';
import RemoveFavourites from '../components/RemoveFavourites';
import PopularMovies from '../components/PopularMovies';

const HomePage = ({ movies, favourites, addFavouriteMovie, removeFavouriteMovie }) => {
  const showSearchResultsHeader = movies.length > 0;

  return (
    <>
      {showSearchResultsHeader && (
        <div className='row d-flex align-items-center mt-3 mb-4'>
          <MovieListHeader header='Searching Results: '/>
        </div>
      )}

      <div className='row'>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favoriteIcon={AddFavourites}
        />
      </div>  

      <div className='row d-flex align-items-center mt-3 mb-4'>
        <MovieListHeader header='Favourites'/>
      </div>

      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favoriteIcon={RemoveFavourites}
        />
      </div>
        
      <div className='row d-flex align-items-center mt-3 mb-4'>
        <MovieListHeader header='Popular Movies'/>
      </div>

      <div className='row'>
        <PopularMovies/>
      </div>

    </>
  );
};

export default HomePage;
