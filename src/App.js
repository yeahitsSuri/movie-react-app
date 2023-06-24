import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeader from './components/MovieListHeader';
import SearchBar from './components/SearchBar';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import MovieIntroScreen from './screen/MovieIntroScreen';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const [favourites, setFavourites]= useState([]);

  const getMovieFromAPI = async(searchKey) => {
    const url = `http://www.omdbapi.com/?s=${searchKey}&apikey=a52e368a`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) { 
      setMovies(responseJson.Search)
    }
  };

  useEffect(()=> {
    getMovieFromAPI(searchKey);
  }, [searchKey]);

  useEffect(() =>{
    const movieFavs = JSON.parse(
      localStorage.getItem('movie-react-app-favs')
      );
    setFavourites(movieFavs);
  }, []);

  const saveToLocal = (item) => {
    localStorage.setItem('movie-react-app-favs', JSON.stringify(item))
  };

  const addFavouriteMovie = (movie) =>{
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocal(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) =>{
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocal(newFavouriteList);
  };

  return (
    <Router>
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-3 mb-4'>
          <MovieListHeader header='Movies'/>
          <SearchBar searchKey={searchKey} setSearchKey={setSearchKey}/>
        </div>

        <div className='row d-flex align-items-center mt-3 mb-4'>
          <MovieListHeader header='Searching Results: '/>
        </div>

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

        <div>
          <div className='row'>
            <MovieList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favoriteIcon={RemoveFavourites}
            />
          </div>
        </div>

        <Routes>
          <Route
            path="/movies/:id"
            element={
              <MovieIntroScreen movies={movies} favourites={favourites} />
            }
          />
        </Routes>
      </div>
    </Router>
  )
};

export default App;
