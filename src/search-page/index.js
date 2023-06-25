import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieListHeader from '../components/MovieListHeader';
import AddFavorites from '../components/AddFavorites';

const SearchPage = ({ setSearchKey, movies, addFavoriteMovie, setMovies }) => {
  const showSearchResultsHeader = movies.length > 0;

  useEffect(() => {
    setSearchKey(''); // Clear the searchKey state when the component mounts
    return () => {
      setMovies([]); // Clear the movies state when the component unmounts
    };
  }, [setSearchKey, setMovies]);

  return (
    <div>
      <div className='row d-flex align-items-center mt-3 mb-2'>
        <MovieListHeader header='Search Here: ' />
      </div>
      <div className='row d-flex align-items-center mt-1 mb-4'>
        <SearchBar searchKey='' setSearchKey={setSearchKey} />
      </div>

      {/* Display Searching Results */}
      {showSearchResultsHeader && (
        <div>
          <div className='row d-flex align-items-center mt-3 mb-4'>
            <MovieListHeader header='Searching Results: ' />
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
